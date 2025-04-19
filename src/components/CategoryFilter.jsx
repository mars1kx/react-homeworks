import './CategoryFilter.css'

function CategoryFilter({ activeCategory, onCategoryChange, products }) {
  const categories = [...new Set(products.map(product => product.category))];

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