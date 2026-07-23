terraform {
  required_version = ">= 1.10.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Backend blocks can't reference variables -- from infra/bootstrap's
  # `terraform output` (bootstrap applied 2026-07-23, account 202891436069).
  # https://developer.hashicorp.com/terraform/language/backend/s3
  backend "s3" {
    bucket       = "euro-homemade-bakery-tfstate"
    key          = "euro-homemade-bakery/terraform.tfstate"
    region       = "us-east-2"
    use_lockfile = true
  }
}
