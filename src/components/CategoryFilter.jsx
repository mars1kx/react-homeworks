import React from 'react'
import './CategoryFilter.css'

const CategoryFilter = ({ activeCategory, onCategoryChange, products, disabled }) => {
  const categories = [...new Set(products.map(product => product.category))];
  
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
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter 