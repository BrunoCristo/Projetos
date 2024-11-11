# To do List

Um sistema para cadastro de lista de tarefas.

## Pré-requisitos

Antes de executar o projeto, certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- [Docker](https://www.docker.com/get-started) (para rodar via Docker)
- [Node.js 20](https://nodejs.org/en/) (certifique-se de usar a versão 20 LTS)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

Além disso, é necessário criar um arquivo de configuração do Firebase. Para isso, siga os passos abaixo.

## Configuração do Firebase

Para configurar o Firebase no projeto, você precisa gerar o arquivo `firebase-key.json` com as credenciais da sua conta do Firebase:

1. Acesse o [Console do Firebase](https://console.firebase.google.com/).
2. No seu projeto, vá para **Configurações do projeto**.
3. Na seção **Contas de serviço**, clique em **Gerar nova chave privada**.
4. Baixe o arquivo JSON gerado e salve-o como `firebase-key.json` na raiz do projeto do Backend.

Esse arquivo é necessário para que o projeto se conecte ao Firebase corretamente.

## Executando o Projeto

### Opção 1: Executando via Docker

1. Certifique-se de ter o **Docker** e o **Docker Compose** instalados.
2. Execute o comando abaixo para construir a imagem e iniciar os containers:

```bash
docker-compose up --build
```
Isso vai construir as imagens e iniciar o backend e o frontend via Docker.

### Opção 2: Executando Localmente
Se preferir rodar o projeto localmente, siga os passos abaixo.

#### Passo 1: Executando o Backend
1. Navegue até a pasta do backend:
```bash
cd backend
```
2. Instale as dependências do backend:
```bash
npm install
```
3. Execute o backend em modo de desenvolvimento:
```bash
npm run start
```
O backend estará rodando localmente. Geralmente, o servidor estará disponível em `http://localhost:8085` (isso pode variar dependendo da configuração).

#### Passo 2: Executando o Frontend
1. Navegue até a pasta do frontend:
```bash
cd frontend
```
2. Instale as dependências do frontend:
```bash
npm install
```
3. Execute o frontend em modo de desenvolvimento:
```bash
npm run dev
```
O frontend estará disponível em `http://localhost:5173` (isso pode variar dependendo da configuração).

