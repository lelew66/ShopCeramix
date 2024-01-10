import React from "react";
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";
import DrinkSetCard from '../components/DrinkSetCard';
import { Link } from "react-router-dom";
import drinksets   from '../data/drinkSetsData.json'
import Footer from '../components/Footer/Footer'

const DrinkSetMain = () => {
  let card = drinksets.products.map((productInfo)=>(
    <DrinkSetCard 
           key={productInfo.id}
           id={productInfo.id}
           imgURL={productInfo.imageURL[0]}
           name= {`${productInfo.name[0].toUpperCase()}${productInfo.name.slice(1)}`}
           price={productInfo.price}
           rate= {productInfo.rate}
           numberOfViews={productInfo.number_of_reviews}
           />
           ));

      
  return (
    <>
      <Promo />
      <Navbar />
      <div className="hero-image">
        <div className="hero-text">
          <h1 className="brand-title">CERAMIX</h1>
          <p className="subtitle">
            Crafted with Love, Inspired by Nature: Where Every Meal Finds Its
            Perfect Nest!
          </p>
          <div className="button-box">
            <Link to="/#prodcut-section">
                <input className="button btn-blue" type="button" value="Shopping now" />
            </Link>
            <Link to="/contact">
                <input className="button  btn-white" type="button" value="Contact us" />
            </Link>
          </div>
        </div>
      </div>
      <div className="product-main">
        <h1 className="product-title">Drink Set</h1>
        <div className="card-container">
        {card}
        </div>
      </div>
      <Footer />

    </>
  );
};

export default DrinkSetMain;
