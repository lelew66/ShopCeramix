import React,{useRef, useEffect} from "react";
import Reviews from "../components/Reviews";
import data from "../data/reviewsData.json";
import ProductData from "../data/productsData.json";
import ProductInfo from "../components/ProductInfo";
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";
import RecommandCard from "../components/RecommandCard";
import ImageSlider from "../components/ImageSlieder";
import { useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Footer from '../components/Footer/Footer'

const ProductDetail = () => {
  // const { id } = useParams();
  const boxRef = useRef(null);

  const location = useLocation();
  const productData = location.state.data;
  console.log("-->data:", productData);

  const card = location.state.products
    .filter((productInfo) => productInfo._id !== productData._id)
    .map((productInfo) => (
      <RecommandCard
        key={productInfo.id}
        id={productInfo.id}
        imgURL={productInfo.imageURL[1]}
        name={`${productInfo.name[0].toUpperCase()}${productInfo.name.slice(1)}`}
        price={productInfo.price}
        rate={productInfo.rate}
        numberOfViews={productInfo.number_of_reviews}
      />
    ));

    // useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/byType?type=${type}`,
    //         {
    //           method: 'GET',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             // Authorization: `Bearer ${user.token}`,
    //           },
    //         });
  
    //       setData(await res.json());
    //       setLoading(false);
    //       // console.log("-->",productss);
    //     } catch (error) {
    //       console.error("->Error ProductCategory:", error);
    //     }
    //   }
  
    //   fetchData();
    // }, []);


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
      data={productData}
      key={productData.id}
      id={productData.id}
      name={productData.name}
      price={productData.price}
      rate={productData.rating}
      reviewNumber={productData.numReviews}
      included={productData.included}
      detail={productData.detail}
      inventory={productData.quantity}
    />
  );

  const imgSlider = <ImageSlider imgURLs={productData.imageURL} />;
  


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

export default ProductDetail;
