import './CategoryFilter.css'

function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <button 
        className={`category-button ${activeCategory === 'desert' ? 'active' : ''}`}
        onClick={() => onCategoryChange('desert')}
      >
        Desert
      </button>
      <button 
        className={`category-button ${activeCategory === 'dinner' ? 'active' : ''}`}
        onClick={() => onCategoryChange('dinner')}
      >
        Dinner
      </button>
      <button 
        className={`category-button ${activeCategory === 'breakfast' ? 'active' : ''}`}
        onClick={() => onCategoryChange('breakfast')}
      >
        Breakfast
      </button>
    </div>
  )
}

export default CategoryFilter 