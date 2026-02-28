# Documentação da API - Teste Técnico SPS-Groups

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Banco de Dados](#banco-de-dados)
- [Guia de Instalação](#guia-de-instalação)
- [Rotas](#rotas)
- [Swagger](#swagger)

---

## Sobre o Projeto

API REST desenvolvida como teste técnico para o processo seletivo da **SPS Groups**.

O projeto simula um sistema de gerenciamento de usuários com autenticação via JWT, permitindo criar, consultar, atualizar e remover usuários, com controle de permissões baseado no tipo de conta (`admin` ou `user`).

### Tecnologias utilizadas

- **Node.js** + **Express** — servidor HTTP
- **bcryptjs** — hash de senhas
- **jsonwebtoken** — autenticação JWT
- **dotenv** — variáveis de ambiente
- **swagger-ui-express** + **swagger-jsdoc** — documentação interativa
- **nodemon** — hot reload em desenvolvimento

---

### Banco de Dados

O projeto utiliza um banco de dados fake em formato JSON, localizado em `src/database/database.json`. Não é necessário configurar nenhum banco externo.

O usuário administrador inicial já vem mockado:

| Campo      | Valor                   |
| ---------- | ----------------------- |
| `id`       | `1`                     |
| `name`     | `admin`                 |
| `email`    | `admin@spsgroup.com.br` |
| `type`     | `admin`                 |
| `password` | `1234`                  |

> Observação: Todos os outros usuários cadastrados posteriormente serão do tipo "user".

---

## Guia de Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Yarn](https://yarnpkg.com/)

### Passos

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd test-sps-server
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Inicie o servidor:
   ```bash
   yarn dev
   ```

O servidor estará disponível em `http://localhost:3000`.

---

## Rotas

### Autenticação

#### `POST /login`

Autentica um usuário e retorna um token JWT.

- **Autenticação:** Não
- **Body:**
  ```json
  {
    "email": "admin@spsgroup.com.br",
    "password": "1234"
  }
  ```
- **Resposta 200:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "name": "admin",
      "email": "admin@spsgroup.com.br",
      "type": "admin"
    }
  }
  ```
- **Resposta 401:** Credenciais inválidas

---

### Usuários

> Rotas marcadas com 🔒 exigem o header `Authorization: Bearer <token>`.

#### `POST /users`

Cria um novo usuário.

- **Autenticação:** Não
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john_doe@email.com",
    "password": "1234"
  }
  ```
- **Resposta 201:** Usuário criado com sucesso
- **Resposta 409:** Email já cadastrado

---

#### 🔒 `GET /users`

Lista todos os usuários cadastrados.

- **Autenticação:** Sim
- **Resposta 200:**

---

#### 🔒 `GET /users/:id`

Retorna os dados de um usuário pelo ID.

- **Autenticação:** Sim
- **Resposta 200:** Dados do usuário
- **Resposta 404:** Usuário não encontrado

---

#### 🔒 `PATCH /users/:id`

Atualiza o nome e/ou email de um usuário.

- **Autenticação:** Sim
- **Permissão:** Admin ou o próprio usuário
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john_new@email.com"
  }
  ```
- **Resposta 200:** Usuário atualizado
- **Resposta 403:** Sem permissão
- **Resposta 409:** Email já cadastrado

---

#### 🔒 `PATCH /users/:id/password`

Altera a senha de um usuário.

- **Autenticação:** Sim
- **Permissão:** Admin ou o próprio usuário
- **Body:**
  ```json
  {
    "oldPassword": "senha_atual",
    "newPassword": "nova_senha"
  }
  ```
- **Resposta 204:** Senha alterada com sucesso
- **Resposta 400:** Senha antiga incorreta
- **Resposta 403:** Sem permissão

---

#### 🔒 `DELETE /users/:id`

Remove um usuário pelo ID.

- **Autenticação:** Sim
- **Permissão:** Admin ou o próprio usuário
- **Resposta 204:** Usuário removido com sucesso
- **Resposta 403:** Sem permissão
- **Resposta 404:** Usuário não encontrado

---

## Swagger

A documentação interativa da API está disponível via Swagger UI.

Com o servidor rodando, acesse:

```
http://localhost:3000/api-docs
```

### Como testar rotas autenticadas

1. Faça login na rota `POST /login` e copie o token retornado.
2. Clique no botão **Authorize** (cadeado) no topo da página.
3. Cole o token no campo e clique em **Authorize**.
4. Todas as rotas protegidas passarão a enviar o token automaticamente.
