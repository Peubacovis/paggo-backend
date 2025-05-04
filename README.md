
# Paggo - OCR Case - Backend

Este é o serviço backend do projeto **Paggo - OCR Case**, desenvolvido com **NestJS** e **Prisma ORM**, responsável por autenticação, upload e processamento de documentos via OCR, integração com LLM, e persistência dos dados extraídos.

## 🧰 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Multer](https://github.com/expressjs/multer) - upload de arquivos
- [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR
- [OpenAI API](https://platform.openai.com/) - LLM (GPT)
- [JWT](https://jwt.io/) - autenticação

---

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta na OpenAI (para chave de API)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/paggo-backend.git
cd paggo-backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados e variáveis de ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/paggo"
JWT_SECRET="sua_chave_jwt"
OPENAI_API_KEY="sua_chave_openai"
UPLOAD_DIR="./uploads"
```

### 4. Rode as migrations do Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Inicie o servidor

```bash
npm run start:dev
```

O backend estará disponível em `http://localhost:3000`.

---

## 📂 Estrutura de Pastas

```bash
src/
├── auth/             # Módulo de autenticação (login, registro, JWT)
├── documents/        # Upload de arquivos, OCR e interação com LLM
├── users/            # CRUD de usuários
├── prisma/           # Integração com banco via Prisma
└── main.ts           # Entry point da aplicação
```

---

## ✅ Funcionalidades

- [x] Registro e login com senha criptografada (bcrypt)
- [x] JWT para autenticação protegendo rotas
- [x] Upload de documentos com validação
- [x] Processamento OCR com extração de texto
- [x] Integração com OpenAI para explicação interativa dos dados
- [x] Listagem de documentos por usuário autenticado
- [x] Download de documentos com texto extraído e respostas do LLM

---

## 🧪 Testes

Rodar testes unitários (se implementados):

```bash
npm run test
```

---

## 🚀 Deploy

Você pode fazer deploy deste backend em serviços como:

- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Fly.io](https://fly.io/)

Certifique-se de definir corretamente as variáveis de ambiente nesses serviços.

---

## 🧠 LLM (OpenAI)

Este backend usa a API da OpenAI para responder perguntas sobre os dados extraídos do documento. A chave da OpenAI deve ser adicionada ao `.env` como `OPENAI_API_KEY`.

---

## 📝 Notas Finais

- Este backend se conecta ao frontend desenvolvido com Next.js.
- Certifique-se de habilitar CORS para permitir conexões do frontend.
- Se desejar, adapte o OCR para outro serviço além do Tesseract.js.

---

## 📫 Contato

Em caso de dúvidas, entre em contato com o desenvolvedor:
**Pedro** - [LinkedIn](https://www.linkedin.com/) - [Email](mailto:seuemail@exemplo.com)
