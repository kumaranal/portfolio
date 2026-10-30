variable "region" {
  type    = string
  default = "us-east-1"
}

variable "name" {
  type    = string
  default = "portfolio-assistant"
}

variable "image_tag" {
  description = "ECR image tag to deploy. Push the image before the second apply (see README)."
  type        = string
  default     = "latest"
}

variable "deploy_lambda" {
  description = "Set false for the first apply, which creates only the ECR repository."
  type        = bool
  default     = true
}

variable "bedrock_model_id" {
  description = "Inference profile ID the app calls."
  type        = string
  default     = "us.anthropic.claude-haiku-5-5"
}

variable "bedrock_foundation_model_id" {
  description = "Underlying foundation model the inference profile routes to (for IAM)."
  type        = string
  default     = "anthropic.claude-haiku-5-5"
}

variable "allowed_origins" {
  description = "Browser origins allowed by CORS."
  type        = list(string)
  default     = ["https://analkumarbiswas.com", "http://localhost:8080"]
}

variable "daily_message_limit" {
  type    = number
  default = 40
}

variable "reserved_concurrency" {
  description = "Hard cap on parallel invocations. Must leave >=10 unreserved in the account; set -1 to disable."
  type        = number
  default     = 5
}

variable "waf_rate_limit" {
  description = "Max requests per IP per 5 minutes before WAF blocks."
  type        = number
  default     = 60
}

variable "api_domain" {
  description = "Optional custom domain for the API (e.g. api.analkumarbiswas.com). Needs acm_certificate_arn."
  type        = string
  default     = ""
}

variable "acm_certificate_arn" {
  description = "us-east-1 ACM certificate covering api_domain."
  type        = string
  default     = ""
}

variable "monthly_budget_usd" {
  type    = number
  default = 10
}

variable "budget_alert_email" {
  type = string
}

variable "github_repo" {
  description = "Optional owner/repo allowed to deploy via GitHub Actions OIDC. Empty disables."
  type        = string
  default     = ""
}
