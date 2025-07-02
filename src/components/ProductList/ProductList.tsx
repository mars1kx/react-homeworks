import React from 'react';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';
import { Meal } from '../../store/types';
import { useTheme } from '../../contexts/ThemeContext';

interface ProductListProps {
  products: Meal[];
  onAddToCart: (id: string, count: number, product: Meal) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const { theme } = useTheme();
  
  if (products.length === 0) {
    return <div className={`no-products ${theme}`}>No products in this category</div>;
  }

  return (
    <div className={`products-grid ${theme}`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList; 