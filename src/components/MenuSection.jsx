import { useState } from 'react'
import './MenuSection.css'
import CategoryFilter from './CategoryFilter'
import ProductList from './ProductList'
import Tooltip from './Tooltip'

function MenuSection({ products }) {
  const initialCategory = products.length > 0 ? products[0].category : '';
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  
  const handleAddToCart = (id, count) => {
    console.log(`Добавлен товар #${id} в корзину в количестве ${count} штук`);
  };
  
  const filteredProducts = products.filter(product => product.category === categoryFilter);
  
  return (
    <div className="main-content">
      <h1 className="menu-title">Browse our menu</h1>
      <p className="menu-description">
        Use our menu to place an order online, or <Tooltip text="+66666666"><span className="highlight">phone</span></Tooltip> our store to place a pickup order. Fast and fresh food.
      </p>
      
      <CategoryFilter 
        activeCategory={categoryFilter} 
        onCategoryChange={setCategoryFilter}
        products={products}
      />
      
      <ProductList 
        products={filteredProducts}
        onAddToCart={handleAddToCart}
      />
      
      <button className="see-more-button">See more</button>
    </div>
  )
}

export default MenuSection 