import React from 'react';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return <div className="no-products">Нет продуктов в данной категории</div>;
  }

  return (
    <div className="products-grid">
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