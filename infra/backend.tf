terraform {
  required_version = ">= 1.10.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Backend blocks can't reference variables -- these are literal
  # placeholders until infra/bootstrap has run once.
  # https://developer.hashicorp.com/terraform/language/backend/s3
  backend "s3" {
    bucket       = "REPLACE_WITH_BOOTSTRAP_STATE_BUCKET_NAME" # TODO(owner): from `terraform output state_bucket_name` in infra/bootstrap
    key          = "euro-homemade-bakery/terraform.tfstate"
    region       = "us-east-2" # TODO(owner): match infra/bootstrap's aws_region if different
    use_lockfile = true
  }
}
