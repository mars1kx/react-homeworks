import React, { Component } from 'react'
import './MenuSection.css'
import CategoryFilter from './CategoryFilter'
import ProductList from './ProductList'
import Tooltip from './Tooltip'
import { saveOrder } from '../__mocks__/api'

class MenuSection extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visibleItemsCount: 6,
      categoryFilter: null
    };
  }

  handleCategoryChange = (category) => {
    console.log('Фильтрация по категориям временно отключена');
  }
  
  handleAddToCart = (id, count) => {
    console.log(`Добавлен товар #${id} в корзину в количестве ${count} штук`);
    this.handleSaveOrder(id, count);
  }

  handleSaveOrder = async (mealId, count) => {
    try {
      await saveOrder(mealId, count);
    } catch (error) {
      console.error('Ошибка при сохранении заказа:', error);
    }
  }
  
  handleLoadMore = () => {
    this.setState(prevState => ({
      visibleItemsCount: prevState.visibleItemsCount + 6
    }));
  }
  
  render() {
    const { products } = this.props;
    const { visibleItemsCount } = this.state;
    
    const visibleProducts = products.slice(0, visibleItemsCount);
    const hasMoreItems = visibleItemsCount < products.length;
    
    return (
      <div className="main-content">
        <h1 className="menu-title">Browse our menu</h1>
        <p className="menu-description">
          Use our menu to place an order online, or <Tooltip text="+66666666"><span className="highlight">phone</span></Tooltip> our store to place a pickup order. Fast and fresh food.
        </p>
        
        <CategoryFilter 
          activeCategory={null} 
          onCategoryChange={this.handleCategoryChange}
          products={products}
          disabled={true}
        />
        
        <ProductList 
          products={visibleProducts}
          onAddToCart={this.handleAddToCart}
        />
        
        {hasMoreItems && (
          <button 
            className="see-more-button"
            onClick={this.handleLoadMore}
          >
            See more
          </button>
        )}
      </div>
    )
  }
}

export default MenuSection 