import React from 'react';
import './CategoryFilter.css';
import { Meal } from '../../store/types';
import { useTheme } from '../../contexts/ThemeContext';

interface CategoryFilterProps {
  activeCategory: string | null;
  onCategoryChange: (category: string) => void;
  products: Meal[];
  disabled: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange, products, disabled }) => {
  const categories = Array.from(new Set(products.map(product => product.category)));
  const { theme } = useTheme();
  
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className={`category-filter ${theme}`}>
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