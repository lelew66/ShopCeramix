import React, { useContext } from "react";
import {Link, } from 'react-router-dom';
import Stars from "./Stars";
import { ShopContext } from "../context/shop-context";
import { useAuthContext } from "../hooks/useAuthContext";


const ProductCard = (props) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const { user } = useAuthContext();
  const cartItemCount = cartItems[props.id];
  

  // console.log("-->data:", props.data);
  
  let info = {
    data: props.data,
    products: props.products
  };
  return (
    
    <div className="card">
        <div className="card-image">
          {/* <Link to={`/ProductDetails/${props.id}`}>  */}
          <Link to="/ProductDetails" state = {info} >
            <img className="porduct-images tableware-images"  src={props.imgURL} alt="product-image"/>
          </Link>
        </div>
        <div className="card-body">
            <h3 className="card-title">{props.name}</h3>
            <p className="card-price">${props.price}</p>
            <div className="rate-stars">
               <span className="stars-box">   
               <Stars 
               rate={props.rate}
              /></span>
                <span className='rate'>{props.rate}</span>
                <span className='review-number'>({props.numberOfViews})reviews</span>
            </div>
            <input type="button" className="button btn-add-to-cart btn-blue" value={`Add To Cart ${cartItemCount > 0 ? `(${cartItemCount})` : ''}`}  onClick={() => addToCart(props._id,user)} />
   
        </div>
    </div>
  )
}

export default ProductCard