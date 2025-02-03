# Use a imagem base Node.js
FROM node:20.11 as build-stage

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY package*.json ./
COPY . .

# Instale as dependências
RUN npm ci

# Construa a aplicação Vue.js
RUN npm run build

# Use uma imagem base nginx para servir a aplicação
FROM nginx:stable-alpine as production-stage

# Copie os arquivos construídos para a imagem nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html/pag-admin-app
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponha a porta 80
EXPOSE 80

# Use o comando padrão do nginx
CMD ["nginx", "-g", "daemon off;"]
