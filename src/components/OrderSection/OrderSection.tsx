import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeFromCart, selectCartItems, selectCartTotal } from "../../store/slices/cartSlice";
import "./OrderSection.css";

const OrderSection: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  
  const [street, setStreet] = useState<string>("");
  const [house, setHouse] = useState<string>("");

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order sent:", { items: cartItems, street, house });
    alert("Order successfully sent!");
    cartItems.forEach(item => dispatch(removeFromCart(item.product.id)));
  };

  useEffect(() => {
    console.log("Current items in cart:", cartItems);
  }, [cartItems]);

  return (
    <div className="order-section">
      <h1 className="order-title">Finish your order</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty. Add items from the menu.</p>
        </div>
      ) : (
        <div className="order-list">
          {cartItems.map((item) => (
            <div className="order-item" key={item.product.id}>
              <div className="order-item-left">
                <div className="order-item-image">
                  <img 
                    src={item.product.img} 
                    alt={item.product.meal} 
                  />
                </div>
                <div className="order-item-info">
                  <h3 className="order-item-name">{item.product.meal}</h3>
                </div>
              </div>
              
              <div className="order-item-right">
                <div className="order-item-price">$ {item.product.price.toFixed(2)} USD</div>
                <div className="order-item-quantity">
                  <input 
                    type="number" 
                    min="1" 
                    value={item.count} 
                    readOnly 
                  />
                </div>
                <button 
                  className="order-item-remove" 
                  onClick={() => handleRemoveItem(item.product.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="order-form-container">
        {cartItems.length > 0 && (
          <div className="order-total">
            <span>Total:</span>
            <span className="total-price">$ {totalPrice.toFixed(2)} USD</span>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="house">House</label>
          <input
            type="text"
            id="house"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            required
          />
        </div>
        
        <button 
          onClick={handleOrderSubmit} 
          className="order-button" 
          disabled={cartItems.length === 0}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderSection; 