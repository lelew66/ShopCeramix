import React from "react";
import data from "../data/aboutData.json";
import AboutCard from "../components/AboutCard";
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer/Footer'

const About = () => {

  const cards = data.about.map((item) => (
    <AboutCard
      key={item.id}
      title={item.title}
      text={item.text}
      img={item.imgURL}
    />
  ));


  return (
    <div className="about-page" >
      <Promo />
      <Navbar />
      <div className="about-container">
        <div className="about-intro">
          <h2 className="about-intro-title"> About us</h2>
          <p className="about-intro-body">
            Fine Ceramic is a celebration of millennial design and timeless
            elegance. Our handmade pieces, crafted by local artists with
            dedication and patience, redefine the art of decorating, making each
            item a unique and exquisite addition to your space.
          </p>
        </div>
        <hr className="line" />
        <div className="about-blogs">
          {cards}
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default About;
