import { useState } from 'react'
import './MenuSection.css'
import CategoryFilter from './CategoryFilter'
import ProductList from './ProductList'
import Tooltip from './Tooltip'

function MenuSection({ products }) {
  const [categoryFilter, setCategoryFilter] = useState('desert');
  const [itemCount, setItemCount] = useState({});
  
  const handleItemCountChange = (id, count) => {
    setItemCount(prev => ({
      ...prev,
      [id]: count
    }));
  };
  
  const handleAddToCart = (id) => {
    console.log(`Добавлен товар #${id} в корзину`);
  };
  
  return (
    <div className="main-content">
      <h1 className="menu-title">Browse our menu</h1>
      <p className="menu-description">
        Use our menu to place an order online, or <Tooltip text="+66666666"><span className="highlight">phone</span></Tooltip> our store to place a pickup order. Fast and fresh food.
      </p>
      
      <CategoryFilter 
        activeCategory={categoryFilter} 
        onCategoryChange={setCategoryFilter} 
      />
      
      <ProductList 
        products={products}
        itemCount={itemCount}
        onItemCountChange={handleItemCountChange}
        onAddToCart={handleAddToCart}
      />
      
      <button className="see-more-button">See more</button>
    </div>
  )
}

export default MenuSection 