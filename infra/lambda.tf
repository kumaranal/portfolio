resource "random_password" "origin_secret" {
  length  = 40
  special = false
}

resource "aws_cloudwatch_log_group" "api" {
  name              = "/aws/lambda/${var.name}"
  retention_in_days = 14
}

resource "aws_lambda_function" "api" {
  count = var.deploy_lambda ? 1 : 0

  function_name                  = var.name
  role                           = aws_iam_role.lambda.arn
  package_type                   = "Image"
  image_uri                      = "${aws_ecr_repository.api.repository_url}:${var.image_tag}"
  architectures                  = ["arm64"]
  memory_size                    = 1024
  timeout                        = 60
  reserved_concurrent_executions = var.reserved_concurrency

  environment {
    variables = {
      ASSISTANT_MODEL_ID         = var.bedrock_model_id
      ASSISTANT_AWS_REGION       = var.region
      ASSISTANT_ALLOWED_ORIGINS  = join(",", var.allowed_origins)
      ASSISTANT_RATE_LIMIT_TABLE = aws_dynamodb_table.rate_limit.name
      ASSISTANT_DAILY_MESSAGE_LIMIT = tostring(var.daily_message_limit)
      ASSISTANT_ORIGIN_SECRET    = random_password.origin_secret.result
    }
  }

  depends_on = [aws_cloudwatch_log_group.api, aws_iam_role_policy_attachment.logs]
}

# The URL is public but useless without the CloudFront-injected secret header (see ASSISTANT_ORIGIN_SECRET).
resource "aws_lambda_function_url" "api" {
  count = var.deploy_lambda ? 1 : 0

  function_name      = aws_lambda_function.api[0].function_name
  authorization_type = "NONE"
  invoke_mode        = "RESPONSE_STREAM"
}

resource "aws_lambda_permission" "url_invoke" {
  count = var.deploy_lambda ? 1 : 0

  statement_id           = "AllowPublicFunctionUrl"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.api[0].function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}

# New public function URLs also require this permission.
resource "aws_lambda_permission" "url_invoke_function" {
  count = var.deploy_lambda ? 1 : 0

  statement_id             = "AllowInvokeViaFunctionUrl"
  action                   = "lambda:InvokeFunction"
  function_name            = aws_lambda_function.api[0].function_name
  principal                = "*"
  invoked_via_function_url = true
}
