# Zips functions/contact-form/ (including node_modules/ -- the Lambda
# bundles its own @aws-sdk/client-sesv2 per AWS's own recommendation, see
# functions/contact-form/index.mjs). .github/workflows/infra.yml runs
# `npm ci` there before any `terraform plan`/`apply` so node_modules exists
# for this to zip.
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../../functions/contact-form"
  output_path = "${path.module}/.build/contact-form.zip"
  excludes    = ["README.md", "local-invoke.mjs"]
}

data "aws_iam_policy_document" "lambda_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name               = "euro-homemade-contact-form-lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_trust.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_logs" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "lambda_ses" {
  statement {
    effect    = "Allow"
    actions   = ["ses:SendEmail", "ses:SendRawEmail"]
    resources = [var.ses_identity_arn]
  }
}

resource "aws_iam_role_policy" "lambda_ses" {
  name   = "send-email"
  role   = aws_iam_role.lambda_exec.id
  policy = data.aws_iam_policy_document.lambda_ses.json
}

# nodejs22.x confirmed as a currently-supported (non-deprecated) Lambda
# runtime via docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html
# (nodejs20.x is already past its deprecation date).
resource "aws_lambda_function" "contact_form" {
  function_name    = "euro-homemade-contact-form"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  role             = aws_iam_role.lambda_exec.arn
  timeout          = 10

  environment {
    variables = {
      SENDER_EMAIL    = var.sender_email
      RECIPIENT_EMAIL = var.recipient_email
    }
  }
}

# HTTP API (not REST API) -- a single Lambda-backed POST endpoint needs
# none of REST API's extra features (API keys, per-client throttling,
# request validation, WAF).
resource "aws_apigatewayv2_api" "this" {
  name          = "euro-homemade-contact-form"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://${var.domain_name}", "https://www.${var.domain_name}"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_form.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.this.execution_arn}/*/*"
}
