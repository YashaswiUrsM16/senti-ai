FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000

# Copy lightweight nginx config to serve on 3000 and proxy API
RUN printf 'server {\n listen 3000;\n location / {\n  root /usr/share/nginx/html;\n  index index.html;\n  try_files $$uri $$uri/ /index.html;\n }\n location /api {\n  proxy_pass http://backend:5000;\n }\n}\n' > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
