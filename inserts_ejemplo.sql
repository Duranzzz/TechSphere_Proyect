-- Script de INSERTs de ejemplo para TechSphere
-- Ejecutar después de crear la base de datos con database.sql

USE techsphere;

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion) VALUES
('Laptops', 'Computadoras portátiles de diferentes marcas y especificaciones'),
('Smartphones', 'Teléfonos inteligentes con tecnología avanzada'),
('Tablets', 'Dispositivos tablet para trabajo y entretenimiento'),
('Accesorios', 'Accesorios para dispositivos tecnológicos'),
('Audio', 'Auriculares, altavoces y dispositivos de audio'),
('Gaming', 'Productos especializados para videojuegos');

-- Insertar marcas
INSERT INTO marcas (nombre, pais_origen) VALUES
('Apple', 'Estados Unidos'),
('Samsung', 'Corea del Sur'),
('HP', 'Estados Unidos'),
('Lenovo', 'China'),
('Dell', 'Estados Unidos'),
('Sony', 'Japón'),
('Logitech', 'Suiza'),
('Razer', 'Estados Unidos'),
('Xiaomi', 'China'),
('Huawei', 'China');

-- Insertar empleados (admin y vendedor)
INSERT INTO empleados (nombre, email, password, rol, fecha_contratacion) VALUES
('Juan Pérez', 'admin@techsphere.com', 'admin123', 'admin', '2024-01-15'),
('María González', 'maria@techsphere.com', 'vendedor123', 'vendedor', '2024-02-01'),
('Carlos Rodríguez', 'carlos@techsphere.com', 'admin456', 'admin', '2024-01-10'),
('Ana Martínez', 'ana@techsphere.com', 'vendedor456', 'vendedor', '2024-03-01');

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, marca_id) VALUES
('MacBook Pro 14" M3', 'Laptop Apple con chip M3, 16GB RAM, 512GB SSD', 15999.00, 5, 1, 1),
('MacBook Air M2', 'Laptop ultradelgada Apple con chip M2, 8GB RAM, 256GB SSD', 11999.00, 8, 1, 1),
('Samsung Galaxy S24 Ultra', 'Smartphone flagship con pantalla 6.8", 256GB, 12GB RAM', 12999.00, 10, 2, 2),
('iPhone 15 Pro Max', 'Smartphone Apple con pantalla 6.7", 256GB, chip A17 Pro', 13999.00, 7, 2, 1),
('HP Pavilion 15', 'Laptop HP con Intel Core i7, 16GB RAM, 512GB SSD', 8999.00, 12, 1, 3),
('Lenovo ThinkPad X1', 'Laptop empresarial Lenovo, Intel Core i5, 8GB RAM', 7999.00, 6, 1, 4),
('iPad Pro 12.9"', 'Tablet Apple con chip M2, 256GB, pantalla Liquid Retina', 10999.00, 9, 3, 1),
('Samsung Galaxy Tab S9', 'Tablet Samsung con S Pen, 256GB, pantalla 11"', 8999.00, 11, 3, 2),
('Dell XPS 13', 'Laptop Dell ultrabook, Intel Core i7, 16GB RAM, 512GB SSD', 9999.00, 4, 1, 5),
('Xiaomi Redmi Note 13', 'Smartphone Xiaomi con pantalla 6.67", 128GB, 8GB RAM', 2499.00, 15, 2, 9),
('AirPods Pro 2', 'Auriculares inalámbricos Apple con cancelación de ruido activa', 2999.00, 20, 5, 1),
('Sony WH-1000XM5', 'Auriculares over-ear Sony con cancelación de ruido', 3499.00, 14, 5, 6),
('Logitech MX Master 3S', 'Mouse inalámbrico Logitech para productividad', 899.00, 25, 4, 7),
('Razer DeathAdder V3', 'Mouse gaming Razer con sensor óptico de alta precisión', 1299.00, 18, 6, 8),
('Teclado Mecánico Razer BlackWidow', 'Teclado gaming Razer con switches mecánicos', 1999.00, 12, 6, 8),
('Huawei MatePad 11', 'Tablet Huawei con pantalla 10.95", 128GB', 3999.00, 8, 3, 10),
('Samsung Galaxy Buds2 Pro', 'Auriculares inalámbricos Samsung con cancelación de ruido', 2499.00, 16, 5, 2),
('HP Monitor 27"', 'Monitor HP Full HD 27 pulgadas para oficina', 1999.00, 10, 4, 3),
('Dell Monitor 24"', 'Monitor Dell Full HD 24 pulgadas IPS', 1599.00, 13, 4, 5),
('Cargador MagSafe Apple', 'Cargador inalámbrico Apple MagSafe para iPhone', 599.00, 30, 4, 1);

-- Insertar imágenes de productos (usando rutas de ejemplo)
INSERT INTO imagenes_productos (producto_id, url_imagen, orden) VALUES
(1, '/images/productos/macbook-pro-14-m3.jpg', 1),
(2, '/images/productos/macbook-air-m2.jpg', 1),
(3, '/images/productos/samsung-galaxy-s24-ultra.jpg', 1),
(4, '/images/productos/iphone-15-pro-max.jpg', 1),
(5, '/images/productos/hp-pavilion-15.jpg', 1),
(6, '/images/productos/lenovo-thinkpad-x1.jpg', 1),
(7, '/images/productos/ipad-pro-12-9.jpg', 1),
(8, '/images/productos/samsung-galaxy-tab-s9.jpg', 1),
(9, '/images/productos/dell-xps-13.jpg', 1),
(10, '/images/productos/xiaomi-redmi-note-13.jpg', 1),
(11, '/images/productos/airpods-pro-2.jpg', 1),
(12, '/images/productos/sony-wh-1000xm5.jpg', 1),
(13, '/images/productos/logitech-mx-master-3s.jpg', 1),
(14, '/images/productos/razer-deathadder-v3.jpg', 1),
(15, '/images/productos/razer-blackwidow.jpg', 1),
(16, '/images/productos/huawei-matepad-11.jpg', 1),
(17, '/images/productos/samsung-galaxy-buds2-pro.jpg', 1),
(18, '/images/productos/hp-monitor-27.jpg', 1),
(19, '/images/productos/dell-monitor-24.jpg', 1),
(20, '/images/productos/cargador-magsafe.jpg', 1);

-- Insertar clientes de ejemplo
INSERT INTO clientes (nombre, email, telefono, direccion) VALUES
('Pedro Sánchez', 'pedro.sanchez@email.com', '70123456', 'Av. Principal #123, La Paz'),
('Laura Fernández', 'laura.fernandez@email.com', '70234567', 'Calle Comercio #456, El Alto'),
('Roberto Morales', 'roberto.morales@email.com', '70345678', 'Av. 6 de Agosto #789, La Paz'),
('Carmen Vargas', 'carmen.vargas@email.com', '70456789', 'Zona Sur, Calle 5 #321, La Paz');

-- Insertar proveedores
INSERT INTO proveedores (nombre, contacto, telefono, email) VALUES
('Distribuidora TechGlobal', 'Juan Distribuidor', '22123456', 'contacto@techglobal.com'),
('Importadora Digital SA', 'María Importadora', '22234567', 'ventas@digitalimport.com'),
('Electrónica Andina', 'Carlos Andino', '22345678', 'info@electronicaandina.com');

-- Insertar algunas ventas de ejemplo (para las métricas)
INSERT INTO ventas (fecha, cliente_id, empleado_id, total) VALUES
('2024-12-15 10:30:00', 1, 2, 15999.00),
('2024-12-15 14:20:00', 2, 2, 2999.00),
('2024-12-16 09:15:00', 3, 4, 12999.00),
('2024-12-16 11:45:00', 1, 2, 899.00),
('2024-12-16 16:30:00', 4, 4, 3499.00),
('2024-12-17 10:00:00', 2, 2, 11999.00),
('2024-12-17 15:20:00', 3, 4, 2499.00),
('2024-12-18 09:30:00', 1, 2, 7999.00),
('2024-12-18 13:15:00', 4, 4, 1999.00),
('2024-12-19 10:45:00', 2, 2, 10999.00);

-- Insertar detalles de ventas
INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 15999.00),
(2, 11, 1, 2999.00),
(3, 3, 1, 12999.00),
(4, 13, 1, 899.00),
(5, 12, 1, 3499.00),
(6, 2, 1, 11999.00),
(7, 10, 1, 2499.00),
(8, 6, 1, 7999.00),
(9, 15, 1, 1999.00),
(10, 7, 1, 10999.00);

-- Insertar algunas compras de ejemplo
INSERT INTO compras (producto_id, proveedor_id, cantidad, precio_compra, fecha_compra) VALUES
(1, 1, 5, 14000.00, '2024-11-01'),
(2, 1, 8, 10000.00, '2024-11-05'),
(3, 2, 10, 11000.00, '2024-11-10'),
(4, 1, 7, 12000.00, '2024-11-15'),
(5, 3, 12, 7500.00, '2024-11-20');

