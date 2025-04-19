import { useState } from 'react'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const [itemCount, setItemCount] = useState(1);

  const handleCountChange = (value) => {
    setItemCount(value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, itemCount);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-details">
        <div className="product-title-price">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">$ {product.price.toFixed(2)} USD</p>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <div className="quantity-control">
            <input 
              type="number" 
              min="1" 
              value={itemCount} 
              onChange={(e) => handleCountChange(parseInt(e.target.value) || 1)}
              className="quantity-input"
            />
          </div>
          <button 
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 