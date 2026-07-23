variable "domain_name" {
  description = "Site domain -- registered via Route 53 (see CLAUDE.md Section 1)."
  type        = string
  default     = "eurohomemadebakery.com"
}

variable "aws_region" {
  description = "Working AWS region (non-CloudFront/ACM resources). ACM/CloudFront-related resources always use us-east-1 via a provider alias, regardless of this value."
  type        = string
  default     = "us-east-2"
}

variable "contact_form_recipient_email" {
  description = "Store notification address the contact-form Lambda sends to."
  type        = string
}

variable "budget_notification_email" {
  description = "Address notified when the monthly AWS Budgets threshold is hit."
  type        = string
}

variable "monthly_budget_limit" {
  description = "Monthly cost budget threshold, in USD."
  type        = number
  default     = 10
}
