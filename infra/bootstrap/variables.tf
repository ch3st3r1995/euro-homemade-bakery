variable "aws_region" {
  description = "AWS region for the working provider (ACM/CloudFront-related resources use us-east-1 regardless, via a provider alias in infra/)."
  type        = string
  default     = "us-east-2"
}

variable "state_bucket_name" {
  description = "Globally-unique S3 bucket name for Terraform remote state. No default -- S3 bucket names are global, so the owner must pick one before running bootstrap."
  type        = string
}

variable "github_repo" {
  description = "GitHub repo in OWNER/NAME form, used to scope the OIDC trust policies."
  type        = string
  default     = "ch3st3r1995/euro-homemade-bakery"
}

variable "domain_name" {
  description = "Site domain name (also the S3 site bucket name in infra/modules/site-hosting) -- not yet registered, see CLAUDE.md Section 1."
  type        = string
  default     = "eurohomemadebakery.com"
}
