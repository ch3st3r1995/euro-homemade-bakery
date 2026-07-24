# time_period_start/time_period_end are optional (default to creation time /
# far future respectively) -- confirmed via the provider's own docs, so no
# placeholder dates are hardcoded here.
resource "aws_budgets_budget" "monthly" {
  name         = "euro-homemade-bakery-monthly"
  budget_type  = "COST"
  limit_amount = tostring(var.budget_limit_usd)
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.notification_email]
  }
}
