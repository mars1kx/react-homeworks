import React from 'react';
import './CategoryFilter.css';

interface Product {
  id: string;
  category: string;
  meal: string;
  price: number;
  img: string;
  description?: string;
  instructions?: string;
}

interface CategoryFilterProps {
  activeCategory: string | null;
  onCategoryChange: (category: string) => void;
  products: Product[];
  disabled: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange, products, disabled }) => {
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="category-filter">
      {categories.map(category => (
        <button 
          key={category}
          className={`category-button ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
          disabled={disabled}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter; 