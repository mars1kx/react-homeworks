import React from 'react';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';

interface Product {
  id: string;
  meal: string;
  price: number;
  img: string;
  description?: string;
  instructions?: string;
  category: string;
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (id: string, count: number, product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return <div className="no-products">No products in this category</div>;
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