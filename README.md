<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://github.com/Peubacovis/paggo-backend" target="blank"><img src="https://user-images.githubusercontent.com/1303154/88677602-1635ba80-d120-11ea-84d8-d263ba5fc3c0.png" width="120" alt="Paggo Logo" /></a>
</p>

# Paggo Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-blue)](https://www.prisma.io/)

API backend para o sistema Paggo de processamento de documentos com OCR (Tesseract.js) e autenticação JWT.

## 📦 Funcionalidades Principais
- Autenticação JWT
- Upload de documentos
- Extração de texto com Tesseract.js
- Integração com banco de dados PostgreSQL via Prisma

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- Tesseract OCR instalado ([instruções](https://tesseract-ocr.github.io/tessdoc/Installation.html))

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Peubacovis/paggo-backend.git
cd paggo-backend

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Execute as migrações do banco
npx prisma migrate dev

# Inicie o servidor
npm run start:dev