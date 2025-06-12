import React, { useState, useEffect } from "react";
import "./MenuSection.css";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import ProductList from "../ProductList/ProductList";
import Tooltip from "../Tooltip/Tooltip";
import { saveOrderApi } from "../../__mocks__/api";
import { Meal } from "../../store/types";

interface OrderInfo {
  url: string;
  options: {
    method: string;
    headers: Record<string, string>;
    body: string;
  };
}

interface MenuSectionProps {
  products: Meal[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ products }) => {
  const [visibleItemsCount, setVisibleItemsCount] = useState<number>(6);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [currentOrderInfo, setCurrentOrderInfo] = useState<OrderInfo | null>(null);
  const [orderStatus, setOrderStatus] = useState<number | null>(null);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!currentOrderInfo) return;
      
      try {
        const response = await fetch(currentOrderInfo.url, currentOrderInfo.options);
        const data = await response.json();
        setOrderStatus(response.status);
        setOrderData(data);
        
        if (response.ok) {
          console.log("Order saved successfully:", data);
        }
      } catch (error) {
        console.error("Error saving order:", error);
      }
    };
    
    if (currentOrderInfo) {
      fetchOrder();
    }
  }, [currentOrderInfo]);

  const handleCategoryChange = (category: string): void => {
    setCategoryFilter((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const handleAddToCart = (id: string, count: number, product: Meal): void => {
    console.log(`Product #${id} added to cart in quantity ${count}`);

    handleSaveOrder(id, count);

    if (product) {
      const addToCartEvent = new CustomEvent("add-to-cart", {
        detail: {
          product: product,
          count: count,
        },
      });
      window.dispatchEvent(addToCartEvent);
    }
  };

  const handleSaveOrder = async (mealId: string, count: number): Promise<void> => {
    const { url, options } = saveOrderApi(mealId, count);
    setCurrentOrderInfo({ 
      url, 
      options: {
        method: options.method,
        headers: options.headers || {},
        body: options.body || ""
      } 
    });
  };

  const handleLoadMore = (): void => {
    setVisibleItemsCount((prevCount) => prevCount + 6);
  };

  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  const visibleProducts = filteredProducts.slice(0, visibleItemsCount);
  const hasMoreItems = visibleItemsCount < filteredProducts.length;

  return (
    <div className="main-content">
      <h1 className="menu-title">Browse our menu</h1>
      <p className="menu-description">
        Use our menu to place an order online, or{" "}
        <Tooltip text="+66666666">
          <span className="highlight">phone</span>
        </Tooltip>{" "}
        our store to place a pickup order. Fast and fresh food.
      </p>

      <CategoryFilter
        activeCategory={categoryFilter}
        onCategoryChange={handleCategoryChange}
        products={products}
        disabled={false}
      />

      <ProductList products={visibleProducts} onAddToCart={handleAddToCart} />

      {hasMoreItems && (
        <button className="see-more-button" onClick={handleLoadMore}>
          See more
        </button>
      )}
    </div>
  );
};

export default MenuSection; 