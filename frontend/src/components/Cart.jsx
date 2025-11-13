import { useState, useEffect } from 'react';

function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.precio) * item.cantidad;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  if (!isOpen) return null;

  const getProductImage = (product) => {
    if (product.imagenes && product.imagenes.length > 0) {
      return product.imagenes[0].url_imagen;
    }
    return '/placeholder-image.jpg';
  };

  return (
    <div className="cart-overlay">
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={getProductImage(item)}
                alt={item.nombre}
                className="cart-item-image"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.nombre}</div>
                <div className="cart-item-price">
                  Bs {parseFloat(item.precio).toFixed(2)}
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.cantidad}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                      disabled={item.cantidad >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-delete"
                    onClick={() => onRemoveItem(item.id)}
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>Bs {total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              alert('Funcionalidad de reserva por WhatsApp próximamente');
            }}
          >
            Reservar por WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;

