FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV VITE_AUTH_MODE=api
RUN npm run build

FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

RUN printf '\
server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  location / {\n\
    try_files $uri /index.html;\n\
  }\n\
  location /assets/ {\n\
    add_header Cache-Control "public, max-age=31536000, immutable";\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]