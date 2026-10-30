# Deploy from AWS CloudShell (Linux)

Run everything in **AWS CloudShell, region N. Virginia (us-east-1)**: the `>_` icon in the console's top bar.
Nothing needs installing on your laptop. Before you start, Bedrock must allow the model
(Bedrock console → Model access / Anthropic use-case form), or the API will answer "unavailable".

Cost note: idle cost is mostly **AWS WAF (~$6/month)**; Lambda, DynamoDB, CloudFront and ECR are near $0 at portfolio traffic.
Bedrock is pay-per-use, and a $10/month budget alarm is created.

## 1. Tools and code
```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
sudo yum -y install terraform
export TF_DATA_DIR=/tmp/tfdata               # CloudShell home is only 1 GB; the AWS provider is large
export AWS_REGION=us-east-1 AWS_DEFAULT_REGION=us-east-1
git clone -b version_12 https://github.com/kumaranal/portfolio.git && cd portfolio
```
If the repo is private, upload a zip with *Actions → Upload file* and unzip it instead.

## 2. Remote state bucket (one time)
```bash
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
BUCKET=portfolio-assistant-tfstate-$ACCOUNT
aws s3api create-bucket --bucket $BUCKET --region us-east-1
aws s3api put-bucket-versioning --bucket $BUCKET --versioning-configuration Status=Enabled
aws s3api put-public-access-block --bucket $BUCKET --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
cd infra
sed "s/YOUR-TERRAFORM-STATE-BUCKET/$BUCKET/" backend.hcl.example > backend.hcl
terraform init -backend-config=backend.hcl
terraform validate
```

## 3. Create the image repository only
```bash
terraform apply -var budget_alert_email=kumaranal.official@gmail.com -var deploy_lambda=false
```

## 4. Build and push the Linux image
```bash
REPO=$(terraform output -raw ecr_repository_url)
aws ecr get-login-password | docker login --username AWS --password-stdin ${REPO%%/*}
cd ../assistant/backend
docker build -t $REPO:latest .
docker push $REPO:latest
cd ../../infra
```

## 5. Create Lambda, CloudFront and WAF
```bash
terraform apply -var budget_alert_email=kumaranal.official@gmail.com
# If it fails on reserved concurrency (new accounts), add: -var reserved_concurrency=-1
terraform output api_url
```
Put that URL in the site repo as `.env.production`:
`VITE_ASSISTANT_API_URL=<api_url>`

## 6. Smoke test
```bash
curl -N "$(terraform output -raw api_url)/chat" -H 'content-type: application/json' \
  -d '{"messages":[{"role":"user","content":"take me to contact"}]}'
```
Expect `event: action` with `"target": "contact"`.

## Updating later
Re-run `node scripts/export-knowledge.mjs` when the portfolio data changes, rebuild/push the image (step 4), then
`aws lambda update-function-code --function-name portfolio-assistant --image-uri $REPO:latest`.
