locals {
  function_host = var.deploy_lambda ? replace(replace(aws_lambda_function_url.api[0].function_url, "https://", ""), "/", "") : ""
  use_custom_domain = var.api_domain != "" && var.acm_certificate_arn != ""
}

# AWS managed policies: no caching; forward all viewer headers except Host (Lambda URLs need their own Host).
data "aws_cloudfront_cache_policy" "disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_origin_request_policy" "all_viewer_except_host" {
  name = "Managed-AllViewerExceptHostHeader"
}

resource "aws_cloudfront_distribution" "api" {
  count = var.deploy_lambda ? 1 : 0

  enabled         = true
  comment         = var.name
  http_version    = "http2and3"
  price_class     = "PriceClass_100"
  web_acl_id      = aws_wafv2_web_acl.api.arn
  aliases         = local.use_custom_domain ? [var.api_domain] : []

  origin {
    origin_id   = "lambda"
    domain_name = local.function_host

    custom_header {
      name  = "x-origin-secret"
      value = random_password.origin_secret.result
    }

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
      origin_read_timeout    = 60
    }
  }

  default_cache_behavior {
    target_origin_id         = "lambda"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = data.aws_cloudfront_cache_policy.disabled.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer_except_host.id
    compress                 = false # compression would buffer the SSE stream
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = local.use_custom_domain ? null : true
    acm_certificate_arn            = local.use_custom_domain ? var.acm_certificate_arn : null
    ssl_support_method             = local.use_custom_domain ? "sni-only" : null
    minimum_protocol_version       = local.use_custom_domain ? "TLSv1.2_2021" : null
  }
}
