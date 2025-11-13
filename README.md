# TechSphere - Tienda de Tecnología

Aplicación web para gestión de inventario y tienda en línea de productos tecnológicos.

## Características

### Parte Administrativa
- Login de administradores (solo usuarios con rol 'admin')
- Dashboard con métricas de ventas (hoy, mes, cantidad de productos)
- Gestión completa de productos (crear, editar, eliminar)
- Búsqueda de productos por categoría
- Visualización de inventario con imágenes, precios y stock

### Parte Cliente
- Catálogo de productos con filtros por categoría y marca
- Búsqueda de productos
- Carrito de compras con gestión de cantidades
- Interfaz moderna y responsive

## Tecnologías

- **Backend**: Django + Django REST Framework
- **Frontend**: React + Vite
- **Base de Datos**: MySQL

## Requisitos Previos

- Python 3.8+
- Node.js 16+
- MySQL 8.0+
- pip (gestor de paquetes de Python)
- npm (gestor de paquetes de Node.js)

## Instalación y Configuración

### 1. Configurar la Base de Datos

1. Ejecuta el script `database.sql` en MySQL para crear la base de datos y las tablas:
```sql
mysql -u root -p < database.sql
```

2. Ejecuta el script `inserts_ejemplo.sql` para insertar datos de ejemplo:
```sql
mysql -u root -p < inserts_ejemplo.sql
```

### 2. Configurar el Backend (Django)

1. Navega a la carpeta del backend:
```bash
cd backend
```

2. Crea y activa un entorno virtual (si no existe):
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Realiza las migraciones (si es necesario):
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Inicia el servidor de desarrollo:
```bash
python manage.py runserver
```

El backend estará disponible en `http://localhost:8000`

### 3. Configurar el Frontend (React)

1. Navega a la carpeta del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Credenciales de Ejemplo

### Administradores
- **Email**: `admin@techsphere.com`
- **Contraseña**: `admin123`

- **Email**: `carlos@techsphere.com`
- **Contraseña**: `admin456`

### Vendedores (no pueden acceder al panel admin)
- **Email**: `maria@techsphere.com`
- **Contraseña**: `vendedor123`

## Estructura del Proyecto

```
TechSphere/
├── backend/                 # Aplicación Django
│   ├── inventory/          # App principal
│   │   ├── models.py      # Modelos de la base de datos
│   │   ├── views.py       # Vistas/Endpoints de la API
│   │   └── serializers.py # Serializers de DRF
│   ├── technosphere_backend/  # Configuración del proyecto
│   └── manage.py
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── api.js         # Configuración de la API
│   │   └── App.jsx        # Componente principal
│   └── package.json
├── database.sql           # Script de creación de BD
└── inserts_ejemplo.sql    # Datos de ejemplo
```

## Endpoints de la API

- `GET /api/productos/` - Listar productos
- `GET /api/productos/{id}/` - Obtener un producto
- `POST /api/productos/` - Crear producto
- `PUT /api/productos/{id}/` - Actualizar producto
- `DELETE /api/productos/{id}/` - Eliminar producto
- `POST /api/auth/login/` - Login de administrador
- `GET /api/categorias/` - Listar categorías
- `GET /api/marcas/` - Listar marcas
- `GET /api/dashboard/metrics/` - Métricas del dashboard

## Notas Importantes

- Las contraseñas se almacenan en texto plano (como se especificó en los requisitos)
- Solo usuarios con rol 'admin' pueden acceder al panel administrativo
- Las imágenes de productos usan rutas relativas que deberás ajustar según tu configuración
- El proyecto está configurado para desarrollo, no para producción

## Solución de Problemas

### Error de conexión a la base de datos
- Verifica que MySQL esté ejecutándose
- Confirma que las credenciales en `settings.py` sean correctas
- Asegúrate de que la base de datos `techsphere` exista

### Error CORS en el frontend
- Verifica que el backend esté ejecutándose en el puerto 8000
- Confirma que `CORS_ALLOWED_ORIGINS` en `settings.py` incluya `http://localhost:5173`

### Productos sin imágenes
- Las rutas de imágenes son ejemplos. Ajusta las URLs en `inserts_ejemplo.sql` según tu configuración
- O actualiza las URLs desde el panel de administración

## Desarrollo

Para contribuir o modificar el proyecto:

1. El backend usa Django REST Framework para la API
2. El frontend usa React con React Router para la navegación
3. Los estilos están en `App.css` usando CSS puro
4. La comunicación entre frontend y backend se realiza mediante axios

## Licencia

Este proyecto es para fines educativos y de demostración.

