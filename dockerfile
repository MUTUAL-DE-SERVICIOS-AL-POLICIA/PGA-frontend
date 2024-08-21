# Etapa de construcción
FROM node:20.5.0 as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar las dependencias utilizando Yarn
RUN npm install

# Compilar la aplicación React
RUN npm build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos de compilación de la etapa de construcción al servidor web Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto en el que la aplicación se ejecutará (puerto 4000)
EXPOSE 3000

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]