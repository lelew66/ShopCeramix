import React, { useState, useEffect } from "react";
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard"
import { Link, useSearchParams  } from "react-router-dom";
// import products from '../data/productsData.json'
import Footer from '../components/Footer/Footer'




const ProductCategory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log("-->type:", type);
  
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  // console.log("-->type:", type);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/byType?type=${type}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${user.token}`,
            },
          });

        setData(await res.json());
        setLoading(false);
        // console.log("-->",productss);
      } catch (error) {
        console.error("->Error ProductCategory:", error);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  // let card = products.products.map((productInfo) => (
  //   <ProductCard
  //     key={productInfo.id}
  //     id={productInfo.id}
  //     imgURL={productInfo.imageURL[0]}
  //     name={`${productInfo.name[0].toUpperCase()}${productInfo.name.slice(1)}`}
  //     price={productInfo.price}
  //     rate={productInfo.rate}
  //     numberOfViews={productInfo.number_of_reviews}
  //   />
  // ));

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
        <h1 className="product-title">Tableware</h1>
        <div className="card-container">
          {/* {card} */}

          {data.map((productInfo) => (
            <ProductCard
              data = {productInfo}
              products = {data}
              key={productInfo.id}
              id={productInfo.id}
              _id={productInfo._id}
              imgURL={productInfo.imageURL[0]}
              name={`${productInfo.name[0].toUpperCase()}${productInfo.name.slice(1)}`}
              price={productInfo.price}
              rate={productInfo.rating}
              numberOfViews={productInfo.numReviews}
            />
          ))}
        </div>
      </div>
      <Footer />

    </>
  );
};

export default ProductCategory;
