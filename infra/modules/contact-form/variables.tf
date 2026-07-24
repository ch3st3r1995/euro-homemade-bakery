variable "domain_name" {
  type = string
}

variable "ses_identity_arn" {
  type = string
}

variable "sender_email" {
  description = "Must be an address covered by the verified SES domain identity."
  type        = string
}

variable "recipient_email" {
  description = "Store notification address the Lambda sends contact-form submissions to."
  type        = string
}
