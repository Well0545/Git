# JB Eletronic - Guia de Deployment

## Visão Geral

Este guia descreve como fazer deploy da aplicação JB Eletronic na AWS com alta disponibilidade e segurança.

---

## Arquitetura Recomendada

```
┌─────────────────────────────────────────────────────────────┐
│                        CloudFront (CDN)                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Application Load Balancer                 │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              ECS Cluster (Backend + Frontend)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Task 1       │  │ Task 2       │  │ Task 3       │      │
│  │ Node.js API  │  │ Node.js API  │  │ Node.js API  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│         RDS Aurora PostgreSQL (Multi-AZ)                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              S3 (Imagens de Produtos)                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Pré-requisitos

- Conta AWS ativa
- AWS CLI configurado
- Docker instalado
- Node.js 18+
- Git

---

## Passo 1: Preparar Aplicação

### 1.1 Variáveis de Ambiente

Crie arquivo `.env.production`:

```bash
# Database
DATABASE_URL=postgresql://user:password@rds-endpoint:5432/jb_eletronic

# Authentication
JWT_SECRET=<gerar-com-openssl-rand-base64-32>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=<seu-app-id>

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<sua-chave>
AWS_SECRET_ACCESS_KEY=<seu-segredo>
S3_BUCKET=jb-eletronic-products

# Application
NODE_ENV=production
PORT=3000
VITE_APP_TITLE=JB Eletronic
VITE_APP_LOGO=https://cdn.example.com/logo.png

# Stripe (opcional)
STRIPE_SECRET_KEY=<sua-chave-stripe>
STRIPE_PUBLISHABLE_KEY=<sua-chave-publica>

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
```

### 1.2 Build da Aplicação

```bash
# Instalar dependências
pnpm install

# Build do frontend
pnpm build

# Verificar build
ls -la dist/
```

---

## Passo 2: Configurar AWS

### 2.1 Criar RDS PostgreSQL

```bash
# Via AWS Console ou CLI
aws rds create-db-instance \
  --db-instance-identifier jb-eletronic-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password <senha-forte> \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxxxxx \
  --backup-retention-period 7 \
  --multi-az
```

### 2.2 Criar S3 Bucket

```bash
# Criar bucket
aws s3 mb s3://jb-eletronic-products --region us-east-1

# Configurar CORS
aws s3api put-bucket-cors \
  --bucket jb-eletronic-products \
  --cors-configuration file://cors.json

# Bloquear acesso público
aws s3api put-bucket-public-access-block \
  --bucket jb-eletronic-products \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

**cors.json:**
```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://jbeletronic.com"],
      "AllowedMethods": ["GET", "PUT", "POST"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

### 2.3 Criar IAM Role

```bash
# Criar role para ECS
aws iam create-role \
  --role-name jb-eletronic-ecs-role \
  --assume-role-policy-document file://trust-policy.json

# Anexar políticas
aws iam attach-role-policy \
  --role-name jb-eletronic-ecs-role \
  --policy-arn arn:aws:iam::aws:policy/CloudWatchLogsFullAccess

aws iam attach-role-policy \
  --role-name jb-eletronic-ecs-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
```

---

## Passo 3: Docker

### 3.1 Criar Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle

EXPOSE 3000

CMD ["node", "dist/server/index.js"]
```

### 3.2 Build e Push para ECR

```bash
# Criar repositório ECR
aws ecr create-repository --repository-name jb-eletronic

# Login no ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build da imagem
docker build -t jb-eletronic:latest .

# Tag para ECR
docker tag jb-eletronic:latest \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/jb-eletronic:latest

# Push
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/jb-eletronic:latest
```

---

## Passo 4: ECS Deployment

### 4.1 Criar ECS Cluster

```bash
aws ecs create-cluster --cluster-name jb-eletronic
```

### 4.2 Criar Task Definition

```bash
aws ecs register-task-definition \
  --cli-input-json file://task-definition.json
```

**task-definition.json:**
```json
{
  "family": "jb-eletronic",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "jb-eletronic",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/jb-eletronic:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:<account-id>:secret:jb-eletronic/db-url"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/jb-eletronic",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### 4.3 Criar Service

```bash
aws ecs create-service \
  --cluster jb-eletronic \
  --service-name jb-eletronic-service \
  --task-definition jb-eletronic \
  --desired-count 3 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:...,containerName=jb-eletronic,containerPort=3000"
```

---

## Passo 5: Configurar Domain e SSL

### 5.1 Route 53

```bash
# Criar hosted zone (se não existir)
aws route53 create-hosted-zone --name jbeletronic.com --caller-reference $(date +%s)

# Criar registro A apontando para ALB
aws route53 change-resource-record-sets \
  --hosted-zone-id <zone-id> \
  --change-batch file://route53-change.json
```

### 5.2 Certificate Manager

```bash
# Solicitar certificado SSL
aws acm request-certificate \
  --domain-name jbeletronic.com \
  --subject-alternative-names www.jbeletronic.com \
  --validation-method DNS
```

---

## Passo 6: CI/CD com GitHub Actions

Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build, tag, and push image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: jb-eletronic
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Update ECS service
        run: |
          aws ecs update-service \
            --cluster jb-eletronic \
            --service jb-eletronic-service \
            --force-new-deployment
```

---

## Passo 7: Monitoramento

### 7.1 CloudWatch

```bash
# Criar log group
aws logs create-log-group --log-group-name /ecs/jb-eletronic

# Criar alarme de CPU
aws cloudwatch put-metric-alarm \
  --alarm-name jb-eletronic-high-cpu \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

### 7.2 Health Check

```bash
# Criar endpoint de health check
# GET /api/health
# Response: { "status": "ok", "timestamp": "2024-01-01T00:00:00Z" }
```

---

## Checklist de Deployment

- [ ] Variáveis de ambiente configuradas
- [ ] RDS criado e testado
- [ ] S3 bucket criado
- [ ] IAM roles configuradas
- [ ] Docker image built e pushed
- [ ] ECS cluster criado
- [ ] Task definition registrada
- [ ] Service criado com ALB
- [ ] Domain e SSL configurados
- [ ] CI/CD pipeline funcionando
- [ ] Monitoramento ativo
- [ ] Backups configurados
- [ ] Testes de carga executados

---

## Troubleshooting

### Erro: "Task failed to start"
- Verificar logs: `aws logs tail /ecs/jb-eletronic --follow`
- Verificar security groups
- Verificar IAM permissions

### Erro: "Database connection refused"
- Verificar RDS security group
- Verificar DATABASE_URL
- Verificar credenciais

### Erro: "S3 access denied"
- Verificar IAM policy
- Verificar bucket permissions
- Verificar AWS credentials

---

## Custos Estimados (Mensal)

| Serviço | Custo |
|---------|-------|
| ECS Fargate (3 tasks) | $50-100 |
| RDS Aurora | $30-50 |
| S3 | $5-10 |
| ALB | $20 |
| CloudFront | $10-20 |
| **Total** | **$115-200** |

---

## Próximos Passos

1. Configurar backups automáticos
2. Implementar auto-scaling
3. Configurar WAF (Web Application Firewall)
4. Implementar disaster recovery
5. Configurar multi-region deployment

---

Para suporte, consulte a [documentação AWS](https://docs.aws.amazon.com/).
