import React, { useState } from 'react'
import './MenuSection.css'
import CategoryFilter from './CategoryFilter'
import ProductList from './ProductList'
import Tooltip from './Tooltip'
import { saveOrder } from '../__mocks__/api'

const MenuSection = ({ products }) => {
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const handleCategoryChange = (category) => {
    // Если пользователь нажимает на ту же категорию, сбрасываем фильтр
    setCategoryFilter(prevCategory => prevCategory === category ? null : category);
  }
  
  const handleAddToCart = (id, count, product) => {
    console.log(`Добавлен товар #${id} в корзину в количестве ${count} штук`);
    
    // Вызываем API для сохранения заказа
    handleSaveOrder(id, count);
    
    // Диспатчим событие для обновления корзины в Header
    if (product) {
      const addToCartEvent = new CustomEvent('add-to-cart', {
        detail: {
          product: product,
          count: count
        }
      });
      window.dispatchEvent(addToCartEvent);
    }
  }

  const handleSaveOrder = async (mealId, count) => {
    try {
      await saveOrder(mealId, count);
    } catch (error) {
      console.error('Ошибка при сохранении заказа:', error);
    }
  }
  
  const handleLoadMore = () => {
    setVisibleItemsCount(prevCount => prevCount + 6);
  }
  
  // Фильтруем продукты по выбранной категории
  const filteredProducts = categoryFilter
    ? products.filter(product => product.category === categoryFilter)
    : products;
  
  // Ограничиваем количество видимых продуктов
  const visibleProducts = filteredProducts.slice(0, visibleItemsCount);
  const hasMoreItems = visibleItemsCount < filteredProducts.length;
  
  return (
    <div className="main-content">
      <h1 className="menu-title">Browse our menu</h1>
      <p className="menu-description">
        Use our menu to place an order online, or <Tooltip text="+66666666"><span className="highlight">phone</span></Tooltip> our store to place a pickup order. Fast and fresh food.
      </p>
      
      <CategoryFilter 
        activeCategory={categoryFilter} 
        onCategoryChange={handleCategoryChange}
        products={products}
        disabled={false}
      />
      
      <ProductList 
        products={visibleProducts}
        onAddToCart={handleAddToCart}
      />
      
      {hasMoreItems && (
        <button 
          className="see-more-button"
          onClick={handleLoadMore}
        >
          See more
        </button>
      )}
    </div>
  )
}

export default MenuSection 