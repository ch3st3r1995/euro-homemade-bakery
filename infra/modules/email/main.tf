# Easy DKIM via aws_sesv2_email_identity (the current, non-BYODKIM path --
# leaving dkim_signing_attributes unset gets AWS-managed Easy DKIM keys).
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_email_identity
resource "aws_sesv2_email_identity" "this" {
  email_identity = var.domain_name
}

# NOTE: the "<token>.dkim.amazonses.com" CNAME target below is the
# well-established Easy DKIM convention, but could not be confirmed against
# an authoritative, live-fetched AWS/Terraform doc page in this session (two
# attempts returned procedural/console-UI content, not a literal record
# example). Verify against docs.aws.amazon.com/ses before the first real
# `terraform apply`.
resource "aws_route53_record" "dkim" {
  for_each = toset(aws_sesv2_email_identity.this.dkim_signing_attributes[0].tokens)

  zone_id = var.hosted_zone_id
  name    = "${each.value}._domainkey.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300
  records = ["${each.value}.dkim.amazonses.com"]
}

# SPF record -- reasonable pairing with SES DKIM per CLAUDE.md's own
# "DKIM/SPF records" wording, not independently re-verified against a
# dedicated SPF-specific AWS doc page this session.
resource "aws_route53_record" "spf" {
  zone_id = var.hosted_zone_id
  name    = var.domain_name
  type    = "TXT"
  ttl     = 300
  records = ["v=spf1 include:amazonses.com ~all"]
}
