
# 📝 Formulário de Cadastro – Vue 3 + Node.js (Express)

## 📁 Estrutura do Projeto

```
project-root/
├── backend/       # API em Node.js (Express)
└── frontend/      # Aplicação Vue (Vite)
```

---

## 🚀 Como rodar localmente

### 1. Clone o projeto

```bash
git clone https://github.com/tuliomarcos/test-mercado-bitcoin.git
cd test-mercado-bitcoin
```

---

### 2. Rodar o Backend (API)

```bash
cd backend
npm install
npm start
```

A API estará disponível em:  
👉 [http://localhost:3000](http://localhost:3000)

---

### 3. Rodar o Frontend (Vue)

```bash
cd ../frontend
npm install
npm run dev
```

A aplicação estará disponível em:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🌐 Endpoints da API

### `[GET] /registration`

- Redireciona para a aplicação frontend
- Exemplo: acessar direto no navegador `http://localhost:3000/registration`

### `[POST] /registration`

- Recebe os dados do formulário em JSON
- Valida os campos obrigatórios com base no `accountType` (`pf` ou `pj`)
- Retorna:
  - **201 Created** se os dados estiverem corretos
  - **400 Bad Request** se algum campo obrigatório estiver faltando

---

## ✅ Validações do Backend

### Se `accountType` for `pf`:

Campos obrigatórios:
- `email`
- `password`
- `name`
- `document`
- `age`
- `phone`
- `accountType`

### Se `accountType` for `pj`:

Campos obrigatórios:
- `email`
- `password`
- `companyName`
- `document`
- `openDate`
- `phone`
- `accountType`

---

## ⚙️ Variáveis de Ambiente

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

## 🛠️ Requisitos

- Node.js 18 ou superior
- NPM ou Yarn


## 🧪 Testando o Projeto

  1. Inicie backend e frontend conforme acima
  2. Acesse: [http://localhost:5173](http://localhost:5173)
  3. Preencha o formulário e clique em "Cadastrar"
  4. Veja a resposta de sucesso ou erro
