output "ecr_repository_url" {
  value = aws_ecr_repository.api.repository_url
}

output "api_url" {
  description = "Base URL for the widget (ASSISTANT API). Point your DNS CNAME at cloudfront_domain if using api_domain."
  value       = var.deploy_lambda ? (local.use_custom_domain ? "https://${var.api_domain}" : "https://${aws_cloudfront_distribution.api[0].domain_name}") : null
}

output "cloudfront_domain" {
  value = var.deploy_lambda ? aws_cloudfront_distribution.api[0].domain_name : null
}

output "github_deploy_role_arn" {
  value = var.github_repo != "" ? aws_iam_role.github_deploy[0].arn : null
}
