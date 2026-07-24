# infra/bootstrap

**Run this locally, once, from your own machine using an IAM admin user's
credentials. Never run this via CI. Never touch it again afterward unless
these bootstrap resources themselves need to change.**

This is the one manual step in the whole project (CLAUDE.md Section 0) --
no agent should run `terraform init`/`plan`/`apply` here.

## Before you run this

1. **Pick a globally-unique S3 bucket name** for Terraform state (S3 bucket
   names are global across all AWS accounts) and pass it as
   `-var="state_bucket_name=..."` or in a `terraform.tfvars` (gitignored --
   see repo root `.gitignore`).
2. **Check whether this AWS account already has a GitHub OIDC provider**
   (`https://token.actions.githubusercontent.com`) from another project. If
   so, `terraform import aws_iam_openid_connect_provider.github <existing-arn>`
   instead of letting `apply` create a duplicate.
3. **Verify the GitHub Actions OIDC `sub` claim format this repo actually
   emits.** GitHub changed to an immutable, ID-based `sub` claim
   (`repo:OWNER@id/REPO@id:ref:...`) for repos created/opted-in on or after
   2026-07-15, replacing the legacy `repo:OWNER/REPO:ref:...` form used in
   `main.tf`'s trust policies. Use GitHub's `actions-oidc-debugger` action
   (or check the repo's Actions run logs) to confirm which format applies,
   and update the `sub` condition values in `main.tf` if this repo emits the
   new format.

## Run

```sh
cd infra/bootstrap
terraform init
terraform plan -var="state_bucket_name=<your-unique-name>"
terraform apply -var="state_bucket_name=<your-unique-name>"
```

## After running

Copy the outputs into:
- `infra/backend.tf` -- `state_bucket_name` output.
- Repo/environment variables `TERRAFORM_APPLY_ROLE_ARN` and
  `CONTENT_DEPLOY_ROLE_ARN` -- used by `.github/workflows/infra.yml` and
  `deploy.yml` respectively.

Then proceed with the rest of `infra/` via a normal PR + CI apply (see the
root CLAUDE.md's execution order).
