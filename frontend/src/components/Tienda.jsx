import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos, getCategorias, getMarcas } from '../api';
import Cart from './Cart';

function Tienda() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedMarca, setSelectedMarca] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProductos();
  }, [productos, selectedCategoria, selectedMarca, searchTerm]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cats, marcasData] = await Promise.all([
        getProductos(),
        getCategorias(),
        getMarcas(),
      ]);
      setProductos(prods);
      setCategorias(cats);
      setMarcas(marcasData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterProductos = () => {
    let filtered = [...productos];

    if (selectedCategoria) {
      filtered = filtered.filter(
        (p) => p.categoria === parseInt(selectedCategoria)
      );
    }

    if (selectedMarca) {
      filtered = filtered.filter((p) => p.marca === parseInt(selectedMarca));
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nombre.toLowerCase().includes(term) ||
          (p.descripcion && p.descripcion.toLowerCase().includes(term))
      );
    }

    setFilteredProductos(filtered);
  };

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('Producto sin stock');
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.cantidad >= product.stock) {
        alert('No hay más stock disponible');
        return;
      }
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, cantidad: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = cartItems.find((item) => item.id === productId);
    if (product && newQuantity > product.stock) {
      alert('No hay más stock disponible');
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const getProductImage = (product) => {
    if (product.imagenes && product.imagenes.length > 0) {
      return product.imagenes[0].url_imagen;
    }
    return '/placeholder-image.jpg';
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <a href="/" className="navbar-brand">
            TechSphere
          </a>
          <div className="navbar-actions">
            <input
              type="text"
              className="search-bar"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="cart-icon" onClick={() => setCartOpen(true)}>
              🛒
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/admin/login')}
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              Admin
            </button>
          </div>
        </div>
      </nav>

      <div className="welcome-section">
        <h1>Bienvenido a TechSphere</h1>
        <p>La mejor tecnología al mejor precio</p>
      </div>

      <div className="container">
        <div className="filters-section">
          <h3>Filtros</h3>
          <div className="filters">
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
            <select
              className="filter-select"
              value={selectedMarca}
              onChange={(e) => setSelectedMarca(e.target.value)}
            >
              <option value="">Todas las marcas</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Cargando productos...
          </div>
        ) : (
          <div className="products-grid">
            {filteredProductos.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                No se encontraron productos
              </div>
            ) : (
              filteredProductos.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={getProductImage(product)}
                    alt={product.nombre}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="product-info">
                    <div className="product-name">{product.nombre}</div>
                    <div className="product-price">
                      Bs {parseFloat(product.precio).toFixed(2)}
                    </div>
                    <div
                      className={`product-stock ${
                        product.stock > 0 ? 'in-stock' : 'out-of-stock'
                      }`}
                    >
                      Stock: {product.stock}
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                      style={{ width: '100%' }}
                    >
                      {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default Tienda;

