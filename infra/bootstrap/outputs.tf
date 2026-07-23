output "state_bucket_name" {
  description = "Paste into infra/backend.tf's bucket field."
  value       = aws_s3_bucket.terraform_state.bucket
}

output "github_oidc_provider_arn" {
  value = aws_iam_openid_connect_provider.github.arn
}

output "terraform_apply_role_arn" {
  description = "Paste into the TERRAFORM_APPLY_ROLE_ARN repo/environment variable used by .github/workflows/infra.yml."
  value       = aws_iam_role.terraform_apply.arn
}

output "content_deploy_role_arn" {
  description = "Paste into the CONTENT_DEPLOY_ROLE_ARN repo/environment variable used by .github/workflows/deploy.yml."
  value       = aws_iam_role.content_deploy.arn
}
