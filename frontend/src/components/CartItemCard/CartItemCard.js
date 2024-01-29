import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from "../../context/shop-context";
import './cartItemCard.css'
import { useAuthContext } from "../../hooks/useAuthContext";

export const CartItemCard = (props) => {
  const { user } = useAuthContext();

  const { addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  
  let itemNumber = props.quantity;

  return (
    <div className="cartItem">
      <div className='img-box'>
        <img className="porduct-images" src={props.image} alt="product image" />
      </div>
      <div className="order-container">
        <p className="card-title" >{props.name}
        </p>
        <p className="card-price"> Price: ${props.price}</p>
        <div className="countHandler">
          <button className="plus-btn" onClick={() => removeFromCart(props._id, user)}> - </button>
          <input
            value={itemNumber}
            onChange={(e) => updateCartItemCount(Number(e.target.value), props._id, user)}
          />
          <button className="plus-btn" onClick={() => addToCart(props._id, user)}> + </button>
        </div>
      </div>
    </div>
  );
};