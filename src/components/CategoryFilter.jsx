import React, { Component } from 'react'
import './CategoryFilter.css'

class CategoryFilter extends Component {
  render() {
    const { activeCategory, onCategoryChange, products, disabled } = this.props;
    
    const categories = [...new Set(products.map(product => product.category))];
    
    if (categories.length === 0) {
      return null;
    }

    return (
      <div className="category-filter">
        {categories.map(category => (
          <button 
            key={category}
            className={`category-button ${activeCategory === category ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={disabled ? null : () => onCategoryChange(category)}
            disabled={disabled}
          >
            {category}
          </button>
        ))}
      </div>
    )
  }
}

CategoryFilter.defaultProps = {
  disabled: false
};

export default CategoryFilter 