provider "aws" {
  region = var.aws_region
}

# ACM certificates for CloudFront must be issued in us-east-1 regardless of
# the working region -- https://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

module "dns_and_cert" {
  source      = "./modules/dns-and-cert"
  domain_name = var.domain_name

  providers = {
    aws           = aws
    aws.us_east_1 = aws.us_east_1
  }
}

module "site_hosting" {
  source              = "./modules/site-hosting"
  domain_name         = var.domain_name
  acm_certificate_arn = module.dns_and_cert.certificate_arn
  hosted_zone_id      = module.dns_and_cert.zone_id
}

module "email" {
  source         = "./modules/email"
  domain_name    = var.domain_name
  hosted_zone_id = module.dns_and_cert.zone_id
}

module "contact_form" {
  source           = "./modules/contact-form"
  domain_name      = var.domain_name
  ses_identity_arn = module.email.identity_arn
  sender_email     = "no-reply@${var.domain_name}"
  recipient_email  = var.contact_form_recipient_email
}

module "budget" {
  source             = "./modules/budget"
  budget_limit_usd   = var.monthly_budget_limit
  notification_email = var.budget_notification_email
}
