import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProductos,
  deleteProducto,
  getDashboardMetrics,
  getCategorias,
} from '../api';
import ProductForm from './ProductForm';

function AdminDashboard({ user, onLogout }) {
  const [productos, setProductos] = useState([]);
  const [metrics, setMetrics] = useState({
    ventas_hoy: 0,
    ventas_mes: 0,
    total_productos: 0,
  });
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [selectedCategoria]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, metricsData, cats] = await Promise.all([
        getProductos(selectedCategoria ? { categoria: selectedCategoria } : {}),
        getDashboardMetrics(),
        getCategorias(),
      ]);
      setProductos(prods);
      setMetrics(metricsData);
      setCategorias(cats);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await deleteProducto(id);
        loadData();
      } catch (err) {
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    loadData();
  };

  const getProductImage = (product) => {
    if (product.imagenes && product.imagenes.length > 0) {
      return product.imagenes[0].url_imagen;
    }
    return '/placeholder-image.jpg';
  };

  return (
    <div className="container">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <div className="admin-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Volver a la tienda
          </button>
          <button className="btn btn-danger" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Ventas de Hoy</h3>
          <div className="value">Bs {metrics.ventas_hoy.toFixed(2)}</div>
        </div>
        <div className="metric-card">
          <h3>Ventas del Mes</h3>
          <div className="value">Bs {metrics.ventas_mes.toFixed(2)}</div>
        </div>
        <div className="metric-card">
          <h3>Cantidad de Productos</h3>
          <div className="value">{metrics.total_productos}</div>
        </div>
      </div>

      <div className="products-section">
        <div className="products-section-header">
          <h2>Inventario de Productos</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              className="filter-select"
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            <button className="btn btn-success" onClick={handleAdd}>
              Añadir Nuevo Producto
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Cargando...
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    No hay productos
                  </td>
                </tr>
              ) : (
                productos.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={getProductImage(product)}
                        alt={product.nombre}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </td>
                    <td>{product.nombre}</td>
                    <td>Bs {parseFloat(product.precio).toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(product)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

export default AdminDashboard;

