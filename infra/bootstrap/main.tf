# infra/bootstrap -- run locally, ONCE, by the owner. Never via CI.
# See README.md in this directory before running anything here.
#
# Local state deliberately -- this creates the remote state bucket and the
# OIDC-trusted roles that everything else in infra/ depends on, so it can't
# itself depend on that backend (see CLAUDE.md Section 5, "the bootstrap
# problem").

terraform {
  required_version = ">= 1.10.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ---------------------------------------------------------------------------
# Terraform remote state: S3 bucket, versioned + encrypted + private.
# State locking uses S3-native `use_lockfile` (Terraform >=1.10, GA since
# 1.11) in infra/backend.tf -- no DynamoDB table needed.
# https://developer.hashicorp.com/terraform/language/backend/s3
# ---------------------------------------------------------------------------

resource "aws_s3_bucket" "terraform_state" {
  bucket = var.state_bucket_name
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket                  = aws_s3_bucket.terraform_state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ---------------------------------------------------------------------------
# GitHub OIDC identity provider (account-wide). If this AWS account already
# has one from another project, `terraform import` it into this resource
# address instead of applying -- do not create a duplicate provider for the
# same URL. thumbprint_list is intentionally omitted: it's Optional+Computed
# and AWS auto-fetches it; GitHub's own 2023 changelog states thumbprint
# pinning is no longer required for their OIDC provider.
# ---------------------------------------------------------------------------

resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

# ---------------------------------------------------------------------------
# terraform-apply role: broad permissions (deliberate least-privilege
# exception per CLAUDE.md Section 5 -- Terraform itself must be able to
# create/modify these resource types). Trusted only by this repo.
#
# NOTE: the `sub` claim condition below assumes GitHub's legacy claim format
# (`repo:OWNER/REPO:...`). GitHub began emitting an immutable, ID-based claim
# format for repos created/opted-in on or after 2026-07-15. Verify which
# format this repo actually emits (e.g. via GitHub's `actions-oidc-debugger`
# action) before running bootstrap, and adjust `var.github_repo` /
# these `values` if needed -- see README.md.
# ---------------------------------------------------------------------------

data "aws_iam_policy_document" "terraform_apply_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${var.github_repo}:ref:refs/heads/main",
        "repo:${var.github_repo}:pull_request",
      ]
    }
  }
}

resource "aws_iam_role" "terraform_apply" {
  name               = "terraform-apply"
  assume_role_policy = data.aws_iam_policy_document.terraform_apply_trust.json
}

data "aws_iam_policy_document" "terraform_apply_permissions" {
  statement {
    sid    = "SiteHostingAndDns"
    effect = "Allow"
    actions = [
      "s3:*",
      "cloudfront:*",
      "route53:*",
      "acm:*",
    ]
    resources = ["*"]
  }

  statement {
    sid    = "EmailComputeAndBudget"
    effect = "Allow"
    actions = [
      "ses:*",
      "sesv2:*",
      "lambda:*",
      "apigateway:*",
      "budgets:*",
    ]
    resources = ["*"]
  }

  # IAM management scoped to a predictable name prefix, rather than blanket
  # iam:*, since Terraform must create/manage the Lambda execution role
  # under infra/modules/contact-form.
  statement {
    sid    = "IamForManagedResources"
    effect = "Allow"
    actions = [
      "iam:CreateRole",
      "iam:DeleteRole",
      "iam:GetRole",
      "iam:PassRole",
      "iam:PutRolePolicy",
      "iam:DeleteRolePolicy",
      "iam:GetRolePolicy",
      "iam:AttachRolePolicy",
      "iam:DetachRolePolicy",
      "iam:ListRolePolicies",
      "iam:ListAttachedRolePolicies",
      "iam:TagRole",
    ]
    resources = [
      "arn:aws:iam::*:role/euro-homemade-*",
    ]
  }
}

resource "aws_iam_role_policy" "terraform_apply" {
  name   = "terraform-apply-permissions"
  role   = aws_iam_role.terraform_apply.id
  policy = data.aws_iam_policy_document.terraform_apply_permissions.json
}

# ---------------------------------------------------------------------------
# content-deploy role: narrow -- S3 write to the site bucket + CloudFront
# invalidation only. Used solely by .github/workflows/deploy.yml, never by
# Terraform. Restricted to the `main` branch only (not PRs).
# ---------------------------------------------------------------------------

data "aws_iam_policy_document" "content_deploy_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "content_deploy" {
  name               = "content-deploy"
  assume_role_policy = data.aws_iam_policy_document.content_deploy_trust.json
}

data "aws_iam_policy_document" "content_deploy_permissions" {
  statement {
    sid    = "SiteBucketWrite"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:ListBucket",
    ]
    resources = [
      "arn:aws:s3:::${var.domain_name}",
      "arn:aws:s3:::${var.domain_name}/*",
    ]
  }

  statement {
    sid     = "CloudFrontInvalidate"
    effect  = "Allow"
    actions = ["cloudfront:CreateInvalidation"]
    # The distribution doesn't exist yet at bootstrap time, so this can't be
    # scoped to its ARN here -- a documented follow-up, not an oversight:
    # tighten this to the specific distribution ARN once
    # infra/modules/site-hosting has applied.
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "content_deploy" {
  name   = "content-deploy-permissions"
  role   = aws_iam_role.content_deploy.id
  policy = data.aws_iam_policy_document.content_deploy_permissions.json
}
