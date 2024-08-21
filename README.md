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
git clone git@github.com:napoleonbaley2011/pga-backend.git
o
git clone https://github.com/napoleonbaley2011/pga-backend.git
```
PASO 2: Construir la imagen y ejecutar el contenedor:
```
docker-compose up --build