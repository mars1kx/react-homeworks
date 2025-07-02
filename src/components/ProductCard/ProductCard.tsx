import React, { useState, ChangeEvent } from 'react';
import './ProductCard.css';
import { Meal } from '../../store/types';
import { useTheme } from '../../contexts/ThemeContext';

interface ProductCardProps {
  product: Meal;
  onAddToCart: (id: string, count: number, product: Meal) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [itemCount, setItemCount] = useState<number>(1);
  const { theme } = useTheme();

  const handleCountChange = (value: number): void => {
    setItemCount(value < 1 ? 1 : value);
  }

  const handleAddToCart = (): void => {
    if (onAddToCart) {
      onAddToCart(product.id, itemCount, product);
    }
  }

  return (
    <div className={`product-card ${theme}`}>
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