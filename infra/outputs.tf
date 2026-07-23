output "site_bucket_name" {
  value = module.site_hosting.bucket_name
}

output "cloudfront_distribution_id" {
  value = module.site_hosting.distribution_id
}

output "cloudfront_domain_name" {
  value = module.site_hosting.distribution_domain_name
}

output "route53_nameservers" {
  description = "Update the domain registrar's nameservers to these values if the domain wasn't registered directly through Route 53 (CLAUDE.md Section 5, step 6)."
  value       = module.dns_and_cert.name_servers
}

output "contact_form_api_endpoint" {
  description = "Paste into the CONTACT_FORM_API_ENDPOINT repo/environment variable used by .github/workflows/deploy.yml, and locally into .env as PUBLIC_CONTACT_FORM_ENDPOINT."
  value       = module.contact_form.api_endpoint
}
