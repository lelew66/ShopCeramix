import React, { useContext } from "react";
import Stars from "./Stars";
import { ShopContext } from "../context/shop-context";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductInfo = (props) => {
  const included = props.included.map((item) => item);
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemCount = cartItems[props.id];
  const { user } = useAuthContext();
  
  return (
    <div className="products-container">
      <p className="product-name">{props.name}</p>
      <p className="card-price">${props.price}</p>
      <div className="rate">
        <span className="stars-box">
          <Stars 
          rate={props.rate}
          />
        </span>
        <span className="rate">{props.rate}</span>
        <span className="review-number">({props.reviewNumber})reviews</span>
      </div>
      <hr className="line margin-top-bottom"/>
      
      <p className="about-card-body margin-top-bottom font-color-black">
        included:
        <br />
        {included.map((content)=> (<p>{content}</p>))}
      </p>
      <p className="about-card-body font-color-black">{props.detail}</p>
      <label htmlFor="quantity">Quantity:</label>
      <br />
      <input
        className="quantity"
        type="number"
        placeholder="1"
        id="quantity"
      ></input>
      <br />
      <input type="button" className="button btn-add-to-cart btn-blue" value={`Add To Cart ${cartItemCount > 0 ? `(${cartItemCount})` : ''}`}  onClick={() => addToCart(props.data._id,user)} />
    </div>
  );
};

export default ProductInfo;
