# 🛒 Proyecto Frontend CrossLab.
## 📄 Descripción
Este proyecto es una aplicación llamada CrossLab, un e-commerce de venta de equipamiento deportivo. Está desarrollado en Vite y React. La aplicación se conecta con un backend desarrollado en Node.js y Express, utilizando un archivo `.env.local` para configurar la URL de la API. Puedes encontrar el repositorio del backend en el siguiente enlace: [Repositorio Backend](https://github.com/Victoria-Sampalo/back_mongoose).

Ambas aplicaciones están desplegadas en Render.com, y además el frontend usa Docker.

La aplicación CrossLab corresponde al proyecto final del módulo superior de Desarrollo de Aplicaciones Web (DAW).


## 📂 Estructura del Proyecto

La estructura del proyecto es la siguiente:

```plaintext
frontendProyectoCrossLab/
|
|—— .env.local
|—— .eslintrc.cjs
|—— .gitignore
|—— dockerfile
|—— index.html
|—— node_modules
|—— package-lock.json
|—— package.json
|—— public
|    |—— images
|        |—— Belts.webp
|        |—— Elbow_Pads.webp
|        |—— Knee_Pads.webp
|        |—— Rope.jpg
|        |—— Vests.jpg
|        |—— Wrist_Guards.jpg
|    |—— vite.svg
|—— src
|    |—— API
|        |—— services.js
|    |—— App.css
|    |—— App.jsx
|    |—— assets
|        |—— ClearCartIcon.svg
|        |—— logoCrossLab.svg
|        |—— react.svg
|    |—— components
|        |—— Account.jsx
|        |—— Cart.css
|        |—— Cart.jsx
|        |—— Checkout.jsx
|        |—— CrearPedido.jsx
|        |—— CrearProductoForm.jsx
|        |—— CreateAccount.jsx
|        |—— DetallePedido.jsx
|        |—— DetalleProducto.jsx
|        |—— EditarPedido.jsx
|        |—— FilterOrder.jsx
|        |—— FilterProductAdmin.jsx
|        |—— Filters.css
|        |—— Filters.jsx
|        |—— Footer.css
|        |—— Footer.jsx
|        |—— GestionPedidos.jsx
|        |—— GestionProductos.jsx
|        |—— GestionUsuarios.jsx
|        |—— Header.css
|        |—— Header.jsx
|        |—— Icons.jsx
|        |—— Login.jsx
|        |—— Products.css
|        |—— Products.jsx
|        |—— SinProducts.css
|        |—— SinProducts.jsx
|        |—— VistaAdmin.jsx
|        |—— VistaNormal.jsx
|    |—— context
|        |—— cart.jsx
|        |—— filters.jsx
|        |—— LoggedProvider.jsx
|    |—— hooks
|        |—— useCart.js
|        |—— useFilters.js
|        |—— useImageExists.js
|        |—— useLogin.js
|    |—— index.css
|    |—— lib
|        |—— data.js
|        |—— serviceOrders.js
|        |—— serviceToken.js
|        |—— textErrors.js
|        |—— valid.js
|    |—— listas-ayuda
|        |—— productos.json
|    |—— main.jsx
|    |—— reducers
|        |—— cart.js
|    |—— services
|        |—— api.js
|    |—— styles
|        |—— account.css
|        |—— DetallePedido.css
|        |—— DetalleProducto.css
|        |—— formStyles.css
|        |—— listStyles.css
|        |—— Login.module.css
|        |—— VistaAdmin.module.css
|    |—— utils
|        |—— utils.js
|—— vite.config.js
```

## 🚀 Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio:

```plaintext
git clone <URL_DEL_REPOSITORIO>
cd frontendProyectoCrossLab
```

### 2.Instalar las dependencias:

```plaintext
npm install
```

### 3.Configurar las variables de entorno:
Crea un archivo `.env.local´ en la raíz del proyecto y define la URL de la API del backend:
🙈 `.env.local´

```plaintext
VITE_API=http://localhost:10000
```

Si deseas verlo desde la dirección URL del backend desplegado en render probar con: 
```plaintext
VITE_API=https://back-mongoose.onrender.com/api
```

#### 4.Ejecutar la aplicación:

- En desarrollo:
```plaintext
npm run dev
```
- En producción:
```plaintext
npm start
```

## 🌟 Componentes Principales

### 💪 Components   
- `Account.jsx`: Componente para gestionar las cuentas de usuario.
- `Cart.jsx`: Componente para mostrar y gestionar el carrito de compras.
- `Checkout.jsx`: Componente para gestionar el proceso de pago.
- `CrearPedido.jsx`: Componente para crear nuevos pedidos.
- `CrearProductoForm.jsx`: Formulario para crear nuevos productos.
- `CreateAccount.jsx`: Formulario para crear una nueva cuenta de usuario.
- `DetalleProducto.jsx`: Componente para mostrar los detalles de un producto.
- `FilterProductAdmin.jsx`: Componente para filtrar productos en la vista de administración.
- `Filters.jsx`: Componente para aplicar filtros a los productos.
- `Footer.jsx`: Componente para el pie de página de la aplicación.
- `GestionPedidos.jsx`: Componente para gestionar pedidos.
- `GestionProductos.jsx`: Componente para gestionar productos.
- `GestionUsuarios.jsx`: Componente para gestionar usuarios.
- `Header.jsx`: Componente para el encabezado de la aplicación.
- `Icons.jsx`: Componente para gestionar íconos.
- `Login.jsx`: Formulario de inicio de sesión.
- `Products.jsx`: Componente para mostrar la lista de productos.
- `SinProducts.jsx`: Componente que se muestra cuando no hay productos disponibles.
- `VistaAdmin.jsx`: Vista principal para los administradores.
- `VistaNormal.jsx`: Vista principal para los usuarios normales.

### 📗 Context
- `cart.jsx`: Contexto para gestionar el estado del carrito de compras.
- `filters.jsx`: Contexto para gestionar los filtros aplicados a los productos.
- `LoggedProvider.jsx`: Contexto para gestionar el estado de inicio de sesión de los usuarios.

### 🪝 Hooks
- `useCart.js`: Hook personalizado para gestionar las acciones del carrito de compras.
- `useFilters.js`: Hook personalizado para aplicar y gestionar filtros.
- `useImageExists.js`: Hook para verificar la existencia de una imagen.
- `useLogin.js`: Hook para gestionar las acciones de inicio de sesión.

### ✨ Reducers
- `cart.js`: Reducer para gestionar el estado del carrito de compras.

### 📦 Lib
- `data.js`: Funciones y datos auxiliares.
- `serviceOrders.js`: Funciones para gestionar pedidos.
- `serviceToken.js`: Funciones para gestionar tokens de autenticación.
- `textErrors.js`: Mensajes de error para la validación.
- `valid.js`: Funciones de validación.

### 📬 Services
- `api.js`: Funciones para interactuar con la API del backend.

### 🎨 Styles 
- `account.css`: Estilos para la gestión de cuentas.
- `formStyles.css`: Estilos para formularios.
- `listStyles.css`: Estilos para listas.
- `Login.module.css`: Estilos específicos para el componente de inicio de sesión.
- `VistaAdmin.module.css`: Estilos específicos para la vista de administrador.
- Además, algunos componentes tienen sus propios archivos CSS dentro del directorio components.

### 🙇 Utils
- `utils.js`: Funciones utilitarias.

## 🌐 Despliegue en Render.com
Para desplegar la aplicación en Render.com, hemos utilizado además un dockerfile para constuir la aplicación. 


### 🐳 Construcción del Docker
Para construir y ejecutar la imagen Docker de la aplicación, usa los siguientes comandos:

Construir la imagen:

```plaintext
docker build -t nombre-imagen .
```

 - En mi caso usé: 

```plaintext
  docker build -t frontend-app .
```
	

Ejecutar el contenedor:
```plaintext
  docker run -d -p <PUERTO_LOCAL>:<PUERTO_CONTENEDOR> nombre-imagen
```

 - En mi caso usé: 

```plaintext
  docker run -d -p 8080:80 frontend-app.
```


### ☁️ Despliegue en Render.com

Para desplegar la aplicación en Render.com, sigue estos pasos:

- Crear un nuevo servicio en Render: Ve a la consola de Render.com y crea un nuevo servicio web, seleccionando tu repositorio.
- Configurar el Dockerfile: Asegúrate de que Render detecte y use tu Dockerfile para construir la aplicación.
- Definir las variables de entorno: En la configuración del servicio en Render, define las variables de entorno como se indicó en el archivo `.env´.
- Desplegar: Render se encargará de construir y desplegar la aplicación automáticamente.

- Nota: en render al parecer no toma las variables indicadas en `.env´, si esto sucede el log aparecerá un fallo en la URL de los primeros servicios que se consulten de `undefined/categories´ por ejemplo, si esto ocurre pon una constante encima de los archivos donde tengas las llamada a la api y enlaza ahí la dirección al backend.

## 🛠️ Tecnologías Utilizadas

- `React`: Biblioteca de JavaScript para construir interfaces de usuario.
- `Vite`: Herramienta de desarrollo rápida para proyectos de frontend.
- `Docker`: Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.
- `Bootstrap`: Framework CSS para el desarrollo de interfaces responsivas.
- `Render.com`: Plataforma de despliegue.
- `Axios`: Cliente HTTP para realizar solicitudes a la API.
- `Jsonwebtoken`: Biblioteca para trabajar con JSON Web Tokens (JWT) para autenticación.


📜 Creador

Este proyecto está ha sido elaborado por Victoria Sampalo García.
