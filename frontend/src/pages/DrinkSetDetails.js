import React,{useRef} from "react";
import Reviews from "../components/Reviews";
import data from "../data/reviewsData.json";
import drinksets   from '../data/drinkSetsData.json'
import ProductInfo from "../components/ProductInfo";
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";

import DrinkSetRecommand from "../components/DrinkSetRecommand";
import ImageSlider from "../components/ImageSlieder";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Footer from '../components/Footer/Footer'

const DrinkSetDetails = () => {
  const { id } = useParams();
  const boxRef = useRef(null);

  const pdt = drinksets.products.find((proudct) => proudct.id === id);

  if (!pdt) {

    return <p>Product not found</p>;
  }

  const card = drinksets.products
    .filter((productInfo) => productInfo.id !== pdt.id)
    .map((productInfo) => (
      <DrinkSetRecommand 
        key={productInfo.id}
        id={productInfo.id}
        imgURL={productInfo.imageURL[1]}
        name={`${productInfo.name[0].toUpperCase()}${productInfo.name.slice(1)}`}
        price={productInfo.price}
        rate={productInfo.rate}
        numberOfViews={productInfo.number_of_reviews}
      />
    ));
  const reviews = data.reviews.map((item) => (
    <Reviews
      key={item.id}
      title={item.title}
      date={item.date}
      country={item.country}
      text={item.text}
      rate={item.rate}
    />
  ));
  const product = (
    <ProductInfo
      key={pdt.id}
      id={pdt.id}
      name={pdt.name}
      price={pdt.price}
      rate={pdt.rate}
      reviewNumber={pdt.number_of_reviews}
      included={pdt.included}
      detail={pdt.detail}
      inventory={pdt.inventory}
    />
  );

  const imgSlider = <ImageSlider imgURLs={pdt.imageURL} />;
  


  const handleLeftArrowClick = () => {
    const width = boxRef.current.clientWidth;
    if (boxRef.current) {
      boxRef.current.scrollLeft -= width;
      console.log(width);
 
    }
  };

  const handleRightArrowClick = () => {
    const width = boxRef.current.clientWidth;
    if (boxRef.current) {
      boxRef.current.scrollLeft += width;
      console.log(width);
    }
  };

  return (
    <div className="about-page">
      <Promo />
      <Navbar />

      <div className="proudctDetail-body ">
        <div className="products-detail-container">
          <div className="products-images">{imgSlider}</div>
          <div className="productInfo">{product}</div>
        </div>
        <div className="margin-top-bottom products-detail-container">
          <h1 className="review-section-title ">CUSTOMER REVIEWS</h1>
          <div>{reviews}</div>
        </div>
        <div className="recommand-card-section">
          <p className="recommand-section-title "> You may also like</p>
          <div className="image-slider">
            <FontAwesomeIcon className="arrow arrow-left"
              icon={faAngleLeft}
              onClick={handleLeftArrowClick}
            />
            <div className="card-container image-silder"  ref={boxRef}
            >{card}</div>
            <FontAwesomeIcon className="arrow arrow-right"
              icon={faAngleRight}
              onClick={handleRightArrowClick}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DrinkSetDetails;
