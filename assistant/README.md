# Portfolio assistant backend

FastAPI + Bedrock (Claude Haiku) streaming chat, deployed to Lambda behind CloudFront/WAF with Terraform.

## Local development
```bash
node scripts/export-knowledge.mjs        # from repo root; regenerates backend/knowledge/portfolio.json
cd assistant/backend
python3 -m venv .venv && .venv/bin/pip install -r requirements-dev.txt
.venv/bin/pytest
.venv/bin/uvicorn app.main:app --port 8099   # uses your AWS CLI credentials
```
`POST /chat` streams SSE events: `text`, `action` (navigate/open_link), `done`, `error`.
Settings are `ASSISTANT_*` env vars (see `app/settings.py`).

## Deploy
```bash
cd infra
cp backend.hcl.example backend.hcl       # fill in your state bucket
terraform init -backend-config=backend.hcl
terraform apply -var budget_alert_email=you@example.com -var deploy_lambda=false   # ECR only
# build + push from assistant/backend (see infra/CLOUDSHELL.md for the full Linux walkthrough):
aws ecr get-login-password | docker login --username AWS --password-stdin <ecr_repository_url>
docker buildx build -t <ecr_repository_url>:latest --push .
terraform apply -var budget_alert_email=you@example.com                            # Lambda, CloudFront, WAF
```
Re-run `node scripts/export-knowledge.mjs` and rebuild the image whenever `src/data/portfolio.ts` changes.
