import './ProductCard.css'

function ProductCard({ product, itemCount, onItemCountChange, onAddToCart }) {
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
              value={itemCount[product.id] || 1} 
              onChange={(e) => onItemCountChange(product.id, parseInt(e.target.value) || 1)}
              className="quantity-input"
            />
          </div>
          <button 
            className="add-to-cart-button"
            onClick={() => onAddToCart(product.id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 