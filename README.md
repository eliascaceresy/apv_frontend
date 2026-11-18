# APV Frontend

Interfaz web de APV (Administrador de Pacientes de Veterinaria). Incluye las pantallas de acceso, registro, confirmación de cuenta y recuperación/cambio de contraseña. Se comunica con la API del proyecto `apv_backend`.

## Tecnologías y herramientas

- Node.js y npm
- React 19 y React Router
- Vite para desarrollo y compilación
- Axios para las solicitudes HTTP
- Tailwind CSS para estilos

Se recomienda Node.js 22.12 o posterior (Vite 8 requiere Node.js 20.19+ o 22.12+).

## Configuración

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea o actualiza el archivo `.env` en esta carpeta:

   ```dotenv
   VITE_BACKEND_URL=http://localhost:4000
   ```

   Esta variable debe contener la URL base del backend, sin `/api`: el cliente HTTP agrega ese segmento automáticamente. Para otro entorno, reemplaza el valor por la URL correspondiente de la API. Las variables `VITE_*` se incorporan al bundle del navegador, así que no guardes secretos en ellas.

## Iniciar en desarrollo

Primero inicia el backend y verifica que esté conectado a MongoDB. Después, desde esta carpeta ejecuta:

```bash
npm run dev
```

Vite mostrará la dirección local en la consola; normalmente es `http://localhost:5173`. Si cambia el puerto, actualiza `FRONTEND_URL` en el `.env` del backend para que CORS y los enlaces de correo apunten al origen correcto.

## Comandos disponibles

```bash
npm run dev      # servidor de desarrollo con recarga en caliente
npm run build    # compilación de producción en dist/
npm run preview  # previsualización local de la compilación
npm run lint     # análisis estático con ESLint
```

Configura `VITE_BACKEND_URL` antes de iniciar el servidor o compilar, porque Vite lee esta variable en esas etapas.

## Base de datos

El frontend no se conecta directamente a la base de datos. Los datos se consultan y actualizan a través del backend, que utiliza MongoDB con Mongoose. Para el entorno local, revisa la configuración de MongoDB y las variables requeridas en el [README del backend](../apv_backend/README.md).
