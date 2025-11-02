# JB Eletronic - E-commerce Platform

Uma plataforma de e-commerce moderna e profissional para venda de eletrônicos, construída com as melhores práticas de desenvolvimento web.

## 🚀 Características

### Backend
- **API REST com tRPC** - Type-safe RPC framework
- **Autenticação JWT** - Integração com Manus OAuth
- **Banco de Dados PostgreSQL** - Com Drizzle ORM
- **Validação de Entrada** - Zod validators
- **Sistema de Erros Estruturado** - Classes customizadas
- **Logging Profissional** - Estruturado e auditável
- **Rate Limiting** - Proteção contra abuso
- **Segurança** - CORS, CSRF, SQL injection protection

### Frontend
- **React 19** - UI moderna e reativa
- **TypeScript** - Type safety completo
- **Tailwind CSS 4** - Styling eficiente
- **shadcn/ui** - Componentes acessíveis
- **Responsive Design** - Mobile-first approach

### Funcionalidades E-commerce
- ✅ Catálogo de produtos com busca e filtros
- ✅ Carrinho de compras persistente
- ✅ Checkout com endereço de entrega
- ✅ Sistema de pedidos com rastreamento
- ✅ Painel administrativo com relatórios
- ✅ Gerenciamento de inventário
- ✅ Integração com pagamentos (Stripe, PayPal)
- ✅ Autenticação de usuários

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm
- PostgreSQL 12+
- Git

## 🛠️ Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/Well0545/Git.git
cd Git
```

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local`:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/jb_eletronic

# Authentication
JWT_SECRET=seu-segredo-jwt-aqui
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=seu-app-id

# AWS S3 (opcional)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua-chave
AWS_SECRET_ACCESS_KEY=seu-segredo
S3_BUCKET=seu-bucket

# Application
NODE_ENV=development
VITE_APP_TITLE=JB Eletronic
```

### 4. Executar migrações do banco de dados

```bash
pnpm db:push
```

### 5. Iniciar o servidor de desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Documentação

- **[API Documentation](./API_DOCUMENTATION.md)** - Referência completa dos endpoints
- **[Deployment Guide](./DEPLOYMENT.md)** - Guia de deployment na AWS
- **[User Guide](./userGuide.md)** - Instruções para usuários finais
- **[TODO List](./todo.md)** - Rastreamento de funcionalidades

## 🏗️ Arquitetura

```
JB Eletronic
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── lib/           # Utilitários e hooks
│   │   └── App.tsx        # Roteamento principal
│   └── public/            # Assets estáticos
├── server/                # Backend Express/tRPC
│   ├── routers/           # Endpoints da API
│   ├── db.ts              # Helpers de banco de dados
│   ├── _core/             # Utilitários do servidor
│   │   ├── errors.ts      # Classes de erro
│   │   ├── logger.ts      # Sistema de logging
│   │   ├── validators.ts  # Validadores Zod
│   │   └── constants.ts   # Configurações
│   └── index.ts           # Entrada do servidor
├── drizzle/               # Schema do banco de dados
├── shared/                # Código compartilhado
└── package.json           # Dependências
```

## 🔐 Segurança

- **Validação de Entrada** - Todos os inputs validados com Zod
- **Rate Limiting** - 100 requisições por 15 minutos
- **CORS** - Configurado para produção
- **CSRF Protection** - Implementado
- **SQL Injection** - Prevenido com Drizzle ORM
- **Autenticação** - JWT com cookies HTTP-only
- **Autorização** - Role-based access control (RBAC)

## 📊 Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 + TypeScript + Tailwind CSS |
| Backend | Express.js + tRPC + Node.js |
| Banco de Dados | PostgreSQL + Drizzle ORM |
| Autenticação | Manus OAuth + JWT |
| Armazenamento | AWS S3 |
| Deployment | AWS (EC2, RDS, CloudFront) |
| CI/CD | GitHub Actions |

## 🚀 Deployment

### AWS Deployment

Siga o guia completo em [DEPLOYMENT.md](./DEPLOYMENT.md):

```bash
# Build da aplicação
pnpm build

# Criar imagem Docker
docker build -t jb-eletronic:latest .

# Push para ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/jb-eletronic:latest

# Deploy no ECS
aws ecs update-service --cluster jb-eletronic --service jb-eletronic-service --force-new-deployment
```

## 🧪 Testes

```bash
# Testes unitários
pnpm test

# Testes de integração
pnpm test:integration

# Cobertura de testes
pnpm test:coverage
```

## 📝 Variáveis de Ambiente

Veja [DEPLOYMENT.md](./DEPLOYMENT.md) para a lista completa de variáveis de ambiente.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para detalhes.

## 👥 Autores

- **JB Eletronic** - Desenvolvido com [Manus AI](https://manus.im)

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato através do email de suporte.

## 🗺️ Roadmap

- [ ] Integração com Stripe (pagamentos)
- [ ] Sistema de cupons e promoções
- [ ] Integração com APIs de envio
- [ ] Sistema de avaliações de produtos
- [ ] App mobile (React Native)
- [ ] Analytics avançado
- [ ] Sistema de recomendação com IA
- [ ] Programa de fidelidade

## 📞 Contato

- **Email:** support@jbeletronic.com
- **Website:** https://jbeletronic.com
- **GitHub:** https://github.com/Well0545/Git

---

**Desenvolvido com ❤️ usando Manus AI**
