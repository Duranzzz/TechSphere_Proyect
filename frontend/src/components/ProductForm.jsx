import { useState, useEffect } from 'react';
import { getCategorias, getMarcas, createProducto, updateProducto } from '../api';

function ProductForm({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    marca: '',
    imagen_url: '',
  });
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        stock: product.stock || '',
        categoria: product.categoria || '',
        marca: product.marca || '',
        imagen_url: product.imagenes?.[0]?.url_imagen || '',
      });
    }
  }, [product]);

  const loadData = async () => {
    try {
      const [cats, marcasData] = await Promise.all([
        getCategorias(),
        getMarcas(),
      ]);
      setCategorias(cats);
      setMarcas(marcasData);
    } catch (err) {
      setError('Error al cargar categorías y marcas');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        categoria: formData.categoria ? parseInt(formData.categoria) : null,
        marca: formData.marca ? parseInt(formData.marca) : null,
      };

      if (product) {
        await updateProducto(product.id, data);
      } else {
        await createProducto(data);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Error al guardar el producto'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            />
          </div>
          <div className="form-group">
            <label>Precio (Bs)</label>
            <input
              type="number"
              step="0.01"
              value={formData.precio}
              onChange={(e) =>
                setFormData({ ...formData, precio: e.target.value })
              }
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select
              value={formData.categoria}
              onChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Marca</label>
            <select
              value={formData.marca}
              onChange={(e) =>
                setFormData({ ...formData, marca: e.target.value })
              }
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            >
              <option value="">Seleccione una marca</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>URL de Imagen</label>
            <input
              type="text"
              value={formData.imagen_url}
              onChange={(e) =>
                setFormData({ ...formData, imagen_url: e.target.value })
              }
              placeholder="/images/productos/ejemplo.jpg"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

