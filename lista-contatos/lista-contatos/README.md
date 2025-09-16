# Lista de Contatos - React

Uma aplicação completa de gerenciamento de contatos desenvolvida com React, Redux e Styled Components.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca para construção da interface
- **Redux Toolkit** - Gerenciamento de estado global
- **React-Redux** - Integração entre React e Redux
- **Styled Components** - Estilização com CSS-in-JS
- **Vite** - Bundler e servidor de desenvolvimento

## 📋 Funcionalidades

### ✅ Gerenciamento de Contatos
- **Adicionar** novos contatos com nome completo, e-mail e telefone
- **Editar** contatos existentes
- **Remover** contatos com confirmação
- **Visualizar** lista de contatos em layout responsivo

### 🎨 Interface
- Design moderno com gradiente de fundo
- Componentes estilizados com Styled Components
- Layout responsivo que se adapta a diferentes tamanhos de tela
- Animações suaves e efeitos hover
- Contador de contatos em tempo real

### 🔧 Funcionalidades Técnicas
- Validação de formulários
- Gerenciamento de estado com Redux
- Componentes reutilizáveis
- Código organizado e bem estruturado

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── ContactForm.jsx    # Formulário de adição/edição
│   ├── ContactItem.jsx    # Item individual da lista
│   └── ContactList.jsx    # Lista de contatos
├── store/
│   ├── contactsSlice.js   # Slice do Redux para contatos
│   └── store.js           # Configuração do store
├── App.jsx                # Componente principal
├── App.css                # Estilos globais
└── main.jsx               # Ponto de entrada
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- pnpm, npm ou yarn

### Instalação e Execução

1. **Instalar dependências:**
   ```bash
   pnpm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   pnpm run dev
   ```

3. **Acessar a aplicação:**
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Scripts Disponíveis

- `pnpm run dev` - Inicia o servidor de desenvolvimento
- `pnpm run build` - Gera build de produção
- `pnpm run preview` - Visualiza o build de produção

## 📱 Como Usar

1. **Adicionar Contato:**
   - Preencha os campos: Nome Completo, E-mail e Telefone
   - Clique em "Adicionar"

2. **Editar Contato:**
   - Clique no botão "Editar" do contato desejado
   - Modifique os dados no formulário
   - Clique em "Atualizar" ou "Cancelar"

3. **Remover Contato:**
   - Clique no botão "Excluir" do contato desejado
   - Confirme a exclusão no diálogo

## 🎯 Características Técnicas

### Redux Store
- **State:** Lista de contatos e contato em edição
- **Actions:** Adicionar, remover, atualizar, definir/limpar edição
- **Reducers:** Gerenciam as mudanças de estado de forma imutável

### Styled Components
- Componentes estilizados com CSS-in-JS
- Temas e variáveis CSS consistentes
- Animações e transições suaves
- Design responsivo com media queries

### Validação
- Verificação de campos obrigatórios
- Feedback visual para o usuário
- Prevenção de submissão com dados inválidos

## 🎨 Design

- **Cores:** Gradiente roxo/azul de fundo, cards brancos
- **Tipografia:** Fonte system (Apple/Segoe UI/Roboto)
- **Layout:** Grid responsivo para lista de contatos
- **Interações:** Hover effects, animações de clique
- **Responsividade:** Adaptação para mobile e desktop

## 📄 Licença

Este projeto foi desenvolvido como exercício educacional.

