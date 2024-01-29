import React from "react";
import data from "../data/aboutData.json";
import AboutCard from "../components/AboutCard";
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import Img1 from "../assets/about2.jpg";
import Img2 from "../assets/about3.jpg";
import Img3 from "../assets/about4.jpg";
import Img4 from "../assets/about5.jpg";
const About = () => {
  const { t } = useTranslation(["about"]);

  return (
    <div className="about-page">
      <Promo />
      <Navbar />
      <div className="about-container">
        <div className="about-intro">
          <h2 className="about-intro-title">{t("title")}</h2>
          <p className="about-intro-body">{t("intro")}</p>
        </div>
        <hr className="line" />
        <div className="about-blogs">
          <AboutCard
            key={1}
            title={t("article1_title")}
            text={t("article1_text")}
            img={Img1}
          />
          <AboutCard
            key={2}
            title={t("article2_title")}
            text={t("article2_text")}
            img={Img2}
          />
          <AboutCard
            key={3}
            title={t("article3_title")}
            text={t("article3_text")}
            img={Img3}
          />
          <AboutCard
            key={4}
            title={t("article4_title")}
            text={t("article4_text")}
            img={Img4}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
