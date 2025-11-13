from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'categorias'
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self) -> str:
        return self.nombre


class Marca(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    pais_origen = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'marcas'
        verbose_name = 'Marca'
        verbose_name_plural = 'Marcas'

    def __str__(self) -> str:
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.SET_NULL,
        related_name='productos',
        null=True,
        blank=True,
    )
    marca = models.ForeignKey(
        Marca,
        on_delete=models.SET_NULL,
        related_name='productos',
        null=True,
        blank=True,
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'productos'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self) -> str:
        return self.nombre


class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=150, unique=True, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'clientes'
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'

    def __str__(self) -> str:
        return self.nombre


class Empleado(models.Model):
    class Roles(models.TextChoices):
        ADMIN = 'admin', 'Administrador'
        VENDEDOR = 'vendedor', 'Vendedor'

    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=150, unique=True)
    password = models.CharField(max_length=255)
    rol = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.VENDEDOR,
    )
    fecha_contratacion = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'empleados'
        verbose_name = 'Empleado'
        verbose_name_plural = 'Empleados'

    def __str__(self) -> str:
        return f"{self.nombre} ({self.get_rol_display()})"


class Venta(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.SET_NULL,
        related_name='ventas',
        null=True,
        blank=True,
    )
    empleado = models.ForeignKey(
        Empleado,
        on_delete=models.SET_NULL,
        related_name='ventas',
        null=True,
        blank=True,
    )
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'ventas'
        verbose_name = 'Venta'
        verbose_name_plural = 'Ventas'

    def __str__(self) -> str:
        return f"Venta #{self.pk} - {self.fecha.date()}"


class ProductoImagen(models.Model):
    producto = models.ForeignKey(
        Producto,
        on_delete=models.CASCADE,
        related_name='imagenes',
    )
    url_imagen = models.CharField(max_length=500)
    orden = models.PositiveIntegerField(default=1)

    class Meta:
        db_table = 'imagenes_productos'
        verbose_name = 'Imagen de producto'
        verbose_name_plural = 'Imágenes de producto'
        ordering = ['orden', 'id']

    def __str__(self) -> str:
        return f"Imagen {self.orden} de {self.producto.nombre}"


class DetalleVenta(models.Model):
    venta = models.ForeignKey(
        Venta,
        on_delete=models.CASCADE,
        related_name='detalles',
    )
    producto = models.ForeignKey(
        Producto,
        on_delete=models.PROTECT,
        related_name='detalles_venta',
    )
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        editable=False,
        blank=True,
        null=True,
    )

    class Meta:
        db_table = 'detalle_ventas'
        verbose_name = 'Detalle de venta'
        verbose_name_plural = 'Detalles de venta'

    def save(self, *args, **kwargs):
        if self.precio_unitario is not None and self.cantidad is not None:
            self.subtotal = self.cantidad * self.precio_unitario
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.cantidad} x {self.producto.nombre}"


class Proveedor(models.Model):
    nombre = models.CharField(max_length=200)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=150, blank=True, null=True)

    class Meta:
        db_table = 'proveedores'
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'

    def __str__(self) -> str:
        return self.nombre


class Compra(models.Model):
    producto = models.ForeignKey(
        Producto,
        on_delete=models.PROTECT,
        related_name='compras',
    )
    proveedor = models.ForeignKey(
        Proveedor,
        on_delete=models.PROTECT,
        related_name='compras',
    )
    cantidad = models.PositiveIntegerField()
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_compra = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'compras'
        verbose_name = 'Compra'
        verbose_name_plural = 'Compras'

    def __str__(self) -> str:
        return f"Compra #{self.pk} - {self.producto.nombre}"
