import React, { Component } from 'react'
import './ProductCard.css'

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 1
    };
  }

  handleCountChange = (value) => {
    this.setState({
      itemCount: value < 1 ? 1 : value
    });
  }

  handleAddToCart = () => {
    const { product, onAddToCart } = this.props;
    const { itemCount } = this.state;
    
    if (onAddToCart) {
      onAddToCart(product.id, itemCount);
    }
    
    const addToCartEvent = new CustomEvent('add-to-cart', {
      detail: {
        product: product,
        count: itemCount
      }
    });
    window.dispatchEvent(addToCartEvent);
  }

  render() {
    const { product } = this.props;
    const { itemCount } = this.state;

    return (
      <div className="product-card">
        <div className="product-image-container">
          <img src={product.img} alt={product.meal} className="product-image" />
        </div>
        <div className="product-details">
          <div className="product-title-price">
            <h3 className="product-title">{product.meal}</h3>
            <p className="product-price">$ {product.price.toFixed(2)} USD</p>
          </div>
          <p className="product-description">
            {product.description || product.instructions.substring(0, 100) + '...'}
          </p>
          <div className="product-actions">
            <div className="quantity-control">
              <input 
                type="number" 
                min="1" 
                value={itemCount} 
                onChange={(e) => this.handleCountChange(parseInt(e.target.value) || 1)}
                className="quantity-input"
              />
            </div>
            <button 
              className="add-to-cart-button"
              onClick={this.handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCard 