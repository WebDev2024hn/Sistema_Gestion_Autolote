# Sistema_Gestion_Autolote
# Sistema de Gestión para un Autolote

## Descripción

Proyecto web para la gestión de las operaciones de un autolote. El sistema permitirá administrar vehículos, clientes y ventas, además de consultar precios utilizando diferentes monedas.

El proyecto será desarrollado utilizando Node.js, Express.js, MySQL y Angular.

## Tecnologías

* Node.js
* Express.js
* MySQL
* Angular
* JSON Web Token (JWT)
* Git y Gitflow

## Funcionalidades principales

* Registro e inicio de sesión de usuarios.
* Gestión de vehículos.
* Gestión de clientes.
* Registro y consulta de ventas.
* Conversión de precios entre diferentes monedas mediante una API externa.
* Interfaz web desarrollada con Angular.

## Estructura del proyecto

```text
Sistema-Gestion-Autolote/
├── routes/
├── middleware/
├── config/
└── app.js
├── frontend/
├── database/
├── docs/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Estado actual

Actualmente se encuentra implementada la estructura inicial del proyecto y el servidor básico de Express.js.

El backend cuenta con una ruta inicial para comprobar que la API se encuentra funcionando.

La implementación de la base de datos, autenticación, funcionalidades del sistema y frontend se realizará en las siguientes etapas del proyecto.

## Equipo

Integrantes:
| Brandon Sauceda:
    Gestión de ventas
    Frontend Angular – Vehículos
    Frontend Angular – Clientes y consultas
    Frontend Angular – Ventas
    Frontend Angular – Monedas
| Candido Amaya:
    Autenticación y usuarios
    Frontend Angular – Autenticación
    Base de datos MySQL
    Integracion y Documentacion 
| Luis Chavez:
    Gestión de vehículos
    Gestión de clientes
    Consultas e historial de clientes
    API externa de monedas


## Ejecución del backend

Desde la carpeta principal del proyecto:

```bash
node app.js
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

La ruta principal permite comprobar que la API está funcionando correctamente.
