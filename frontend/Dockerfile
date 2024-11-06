# Usa uma imagem Node.js 20 para o Vite
FROM node:20

# Cria o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . .

# Expõe a porta do Vite (5173)
EXPOSE 5173

# Comando para iniciar o Vite
CMD ["npm", "run", "dev", "--", "--host"]
