from datetime import date

from django.db.models import F, Q, Sum
from django.utils.timezone import now
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Categoria, Empleado, Marca, Producto, Venta
from .serializers import (
    CategoriaSerializer,
    EmpleadoSerializer,
    MarcaSerializer,
    ProductoSerializer,
)


class AuthLoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'detail': 'Email y contraseña son requeridos.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            empleado = Empleado.objects.get(email=email, password=password)
        except Empleado.DoesNotExist:
            return Response(
                {'detail': 'Credenciales inválidas.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if empleado.rol != Empleado.Roles.ADMIN:
            return Response(
                {'detail': 'No tiene permisos de administrador.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = EmpleadoSerializer(empleado)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoriaListView(APIView):
    def get(self, request, *args, **kwargs):
        categorias = Categoria.objects.all().order_by('nombre')
        serializer = CategoriaSerializer(categorias, many=True)
        return Response(serializer.data)


class MarcaListView(APIView):
    def get(self, request, *args, **kwargs):
        marcas = Marca.objects.all().order_by('nombre')
        serializer = MarcaSerializer(marcas, many=True)
        return Response(serializer.data)


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all().select_related('categoria', 'marca').prefetch_related('imagenes')
    serializer_class = ProductoSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        categoria_id = self.request.query_params.get('categoria')
        marca_id = self.request.query_params.get('marca')
        search = self.request.query_params.get('search')

        if categoria_id:
            queryset = queryset.filter(categoria_id=categoria_id)
        if marca_id:
            queryset = queryset.filter(marca_id=marca_id)
        if search:
            queryset = queryset.filter(
                Q(nombre__icontains=search) | Q(descripcion__icontains=search)
            )
        return queryset.order_by('nombre')


class DashboardMetricsView(APIView):
    def get(self, request, *args, **kwargs):
        hoy = date.today()
        inicio_mes = hoy.replace(day=1)

        ventas_hoy = (
            Venta.objects.filter(fecha__date=hoy)
            .aggregate(total=Sum('total'))['total']
            or 0
        )

        ventas_mes = (
            Venta.objects.filter(fecha__date__gte=inicio_mes, fecha__date__lte=hoy)
            .aggregate(total=Sum('total'))['total']
            or 0
        )

        total_productos = Producto.objects.count()

        return Response(
            {
                'ventas_hoy': float(ventas_hoy),
                'ventas_mes': float(ventas_mes),
                'total_productos': total_productos,
                'ultima_actualizacion': now().isoformat(),
            }
        )
