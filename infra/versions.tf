terraform {
  required_version = ">= 1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  # Partial config; supply bucket/key/region with: terraform init -backend-config=backend.hcl
  backend "s3" {}
}

# CloudFront WAF and ACM certificates must live in us-east-1, so everything runs there.
provider "aws" {
  region = var.region

  default_tags {
    tags = { Project = "portfolio-assistant", ManagedBy = "terraform" }
  }
}
