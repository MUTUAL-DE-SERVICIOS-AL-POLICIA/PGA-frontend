# INSTALAR PLATAFORMA PARA ALMACENES

## Requerimientos

- Node use >=v20.5.0
- npm 9.8.0

## Configuracion del archivo .env
 
- Establecer la variable de entorno *VITE_HOST_BACKEND* con el PGA-BACKEND
- Establecer la variable de entorno *VITE_HOST* con el IP del computador
- Establecer la variable de entorno *VITE_PORT* con el puerto del computador

## Despligue con docker
PASO 1: Copiar el proyecto de github
```
gh repo clone MUTUAL-DE-SERVICIOS-AL-POLICIA/PGA-frontend
o
https://github.com/MUTUAL-DE-SERVICIOS-AL-POLICIA/PGA-frontend.git
```
PASO 2: Construir la imagen y ejecutar el contenedor:
```
docker-compose up -d --build