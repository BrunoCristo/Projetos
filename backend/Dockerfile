# Usa uma imagem Node.js 20
FROM node:20

# Cria o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . .

# Expõe a porta do backend (8085)
EXPOSE 8085

# Comando para iniciar o servidor
CMD ["node", "index.js"]
