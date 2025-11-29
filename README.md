# SICFOR - Sistema Integral de Gestión

Este proyecto es un Sistema Integral de Gestión para un Centro de Formación y Cursos (SICFOR), desarrollado con Node.js, Express y MySQL.


## ⚙️ Configuración de Base de Datos

El proyecto utiliza una base de datos MySQL remota. A continuación se detallan las credenciales para configurarlas en el archivo `.env` o para acceder desde cualquier cliente SQL (Workbench, DBeaver, HeidiSQL, etc.).

### Credenciales de Acceso

| Parámetro | Valor |
|-----------|-------|
| **Host** | `34.27.58.232` |
| **Puerto** | `3306` |
| **Usuario** | `diseño` |
| **Contraseña** | `diseño` |
| **Base de Datos** | `SICFOR` |

### Archivo `.env`

Asegúrate de que tu archivo `.env` en la raíz del proyecto tenga el siguiente contenido:

```ini
# Base de datos
DB_HOST=34.27.58.232
DB_USER=diseño
DB_PASSWORD=diseño
DB_NAME=SICFOR
DB_PORT=3306
# Servidor
PORT=8080
NODE_ENV=development
```
