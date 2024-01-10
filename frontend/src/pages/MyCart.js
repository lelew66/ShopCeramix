import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import Promo from "../components/Promo/Promo";
import Footer from "../components/Footer/Footer";
import { ShopContext } from "../context/shop-context";
// import PRODUCTS from "../data/productsData.json";
import { CartItemCard } from "../components/CartItemCard/CartItemCard";

const MyCart = () => {
  const { user } = useAuthContext();

  const {checkout, getCartInfo } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);
  // const [isloading, setIsLoading] = useState(true);
  const [myCart, setMyCart] = useState([]);
  const [items, setItems] = useState([]);

  let prodects;

  //let myCart = [];
    useEffect(() => {
    async function fetchData() {
      const data = await getCartInfo(user);
      console.log("====>data:", data);
      setItems(data);
      console.log("====>totalAmount:", data.length);
      setTotalAmount(data.length);
    }
    fetchData();
  }, []);

  //const card = myCart.map((product) => (
  //     <CartItemCard
  //     key={product.id}
  //     id={product.id}
  //     name={product.name}
  //     price={product.price}
  //     image={product.imageURL[0]}
  //   />
  // ));

  return (
    <div className="page-container">
      <Promo />
      <Navbar />
      {!user && (
        <div className="cart">
          <h2>Check out all our elegant ceramics</h2>
          <h5 className="page-subtitle">Home Décor</h5>
          product 1 component goes here
          <h5 className="page-subtitle">DRINK SET</h5>
          product 2 component goes here
          <h5 className="page-subtitle">TABLEWARE</h5>
          product 3 component goes here
        </div>
      )}
      {user && (
        <div className="cart">
          <h2>My Cart</h2>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="orders">
              {totalAmount > 0 ? (
                <div className="checkout">
                  <div className="cartCard">
                    {/* {card} */}
                    {items.map((product) => (
                      <CartItemCard
                        _id={product._id}
                        key={product.productId}
                        id={product.productId}
                        name={product.name}
                        price={product.price}
                        image={product.imageURL}
                        quantity={product.quantity}
                      />
                    ))}
                  </div>
                  <p> Subtotal: ${totalAmount} </p>
                  <button className="checkout-btn" onClick={() => navigate("/")}>
                    {" "}
                    Continue Shopping{" "}
                  </button>
                  <button
                    className="checkout-btn"
                    onClick={() => {
                      // checkout();
                      setShowPayment(true);

                    }}
                  >
                    {" "}
                    Checkout{" "}
                  </button>
                </div>
              ) : (
                <div>
                  <h1> Your Shopping Cart is Empty</h1>
                  <button className="btn-blue button" onClick={() => navigate("/")}>
                    {" "}
                    Continue Shopping{" "}
                  </button>
                </div>
              )}
            </div>
          </div>
          {showPayment && (
            <div className="checkout-container">
              <div className="cart-top">
                <div className="delivery-info">
                  <form>
                    <h3>Contact</h3>
                    <div className="input-wrap">
                      <span>Email</span>
                      <input type="email" id="email" />
                    </div>

                    <h3>Delivery</h3>
                    <div className="row-wrap">
                      <div className="input-wrap">
                        <span>First Name</span>
                        <input type="text" id="firstname" />
                      </div>

                      <div className="input-wrap">
                        <span>Last Name</span>
                        <input type="text" id="lastname" />
                      </div>
                    </div>

                    <div className="input-wrap">
                      <span>Country</span>
                      <input type="text" id="country" />
                    </div>

                    <div className="input-wrap">
                      <span>Address</span>
                      <input type="text" id="address" />
                    </div>

                    <div className="row-wrap">
                      <div className="input-wrap">
                        <span>City</span>
                        <input type="text" id="city" />
                      </div>

                      <div className="input-wrap">
                        <span>Post Code</span>
                        <input type="text" id="postcode" />
                      </div>
                    </div>

                    <div className="input-wrap">
                      <span>Phone</span>
                      <input type="text" id="phone" />
                    </div>

                    <h3>Shipping method</h3>
                    <label>
                      <input type="radio" name="radio" />
                      Standard shipping
                    </label>
                    <label>
                      <input type="radio" name="radio" checked="checked" />
                      Express shipping
                    </label>
                  </form>
                </div>
              </div>

              <div className="cart-bottom">
                <div className="payment-section">
                  {/* <h3>Payment Details</h3>
              <div className="stripe-payment-form">
                <p>THE INFO FOR THIS AREA WILL BE PASRSED FROM STRIPE </p>
              </div> */}
                  <button
                    className="checkout-btn"
                    onClick={() => {
                      checkout(user);

                    }}
                  >
                    {" "}
                    Pay now{" "}
                  </button>
                </div>
              </div>
            </div>)}
          <div className="payment-section">
            <div className="publicity">
              <h2>BOXING DAY</h2>
              <h4>SPECIAL PRICE WITH </h4>
              <h4>PROMOTION CODE</h4>
              <h4>
                <span style={{ color: "#FFC107" }}>"BOXINGCREAMICS"</span>.
              </h4>
              <h4>LIMITED OFFER ONLY FOR </h4>
              <h3>
                <span
                  style={{ color: "var(--black-color)", fontWeight: "bold" }}
                >
                  FIRST 200 ORDERS!!
                </span>
              </h3>
            </div>
          </div>
        </div>

      )}

      <Footer />
    </div>
  );
};

export default MyCart;
