from typing import Any

from rest_framework import serializers

from .models import (
    Categoria,
    DetalleVenta,
    Empleado,
    Marca,
    Producto,
    ProductoImagen,
    Venta,
)


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'descripcion']


class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['id', 'nombre', 'pais_origen']


class ProductoImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoImagen
        fields = ['id', 'url_imagen', 'orden']


class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(
        source='categoria.nombre',
        read_only=True,
    )
    marca_nombre = serializers.CharField(
        source='marca.nombre',
        read_only=True,
    )
    imagenes = ProductoImagenSerializer(many=True, read_only=True)
    imagen_url = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
        allow_null=True,
    )

    class Meta:
        model = Producto
        fields = [
            'id',
            'nombre',
            'descripcion',
            'precio',
            'stock',
            'categoria',
            'categoria_nombre',
            'marca',
            'marca_nombre',
            'fecha_creacion',
            'imagenes',
            'imagen_url',
        ]

    def _upsert_main_image(self, producto: Producto, url: str | None) -> None:
        if url is None:
            return
        url = url.strip()
        if not url:
            return

        imagen = producto.imagenes.order_by('orden', 'id').first()
        if imagen:
            imagen.url_imagen = url
            imagen.orden = 1
            imagen.save()
        else:
            ProductoImagen.objects.create(
                producto=producto,
                url_imagen=url,
                orden=1,
            )

    def create(self, validated_data: dict[str, Any]) -> Producto:
        imagen_url = validated_data.pop('imagen_url', None)
        producto = super().create(validated_data)
        self._upsert_main_image(producto, imagen_url)
        return producto

    def update(self, instance: Producto, validated_data: dict[str, Any]) -> Producto:
        imagen_url = validated_data.pop('imagen_url', None)
        producto = super().update(instance, validated_data)
        if imagen_url is not None:
            self._upsert_main_image(producto, imagen_url)
        return producto


class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = ['id', 'nombre', 'email', 'rol', 'fecha_contratacion']


class DetalleVentaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(
        source='producto.nombre',
        read_only=True,
    )

    class Meta:
        model = DetalleVenta
        fields = [
            'id',
            'producto',
            'producto_nombre',
            'cantidad',
            'precio_unitario',
            'subtotal',
        ]


class VentaSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True, read_only=True)

    class Meta:
        model = Venta
        fields = ['id', 'fecha', 'cliente', 'empleado', 'total', 'detalles']

