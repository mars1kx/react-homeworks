import React, { useState, ChangeEvent } from 'react';
import './ProductCard.css';

interface Product {
  id: string;
  meal: string;
  price: number;
  img: string;
  description?: string;
  instructions?: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string, count: number, product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [itemCount, setItemCount] = useState<number>(1);

  const handleCountChange = (value: number): void => {
    setItemCount(value < 1 ? 1 : value);
  }

  const handleAddToCart = (): void => {
    if (onAddToCart) {
      onAddToCart(product.id, itemCount, product);
    }
  }

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
          {product.description || (product.instructions && product.instructions.substring(0, 100) + '...')}
        </p>
        <div className="product-actions">
          <div className="quantity-control">
            <input 
              type="number" 
              min="1" 
              value={itemCount} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleCountChange(parseInt(e.target.value) || 1)}
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
  );
};

export default ProductCard; 