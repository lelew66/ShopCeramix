import React from "react";
import data from "../data/faqData.json";
import FaqCard from "../components/FaqCard";
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom';


const Faq = () => {

    const faqs = data.faq.map((item) => (
        <FaqCard
            key={item.id}
            question={item.question}
            answer={item.answer}
            icon={item.icon}
        />
    ));


    return (
        <div className="faq-page" >
            <Promo />
            <Navbar />
            <div className="faq-container">
                <div className="faq-title-container">
                    <h5 className="faq-subtitle">faqs</h5>
                    <h2 className="faq-title">Ask us anything</h2>
                    <h5 className="faq-subtitle">Have any questions? We're here to assist you.</h5>
                </div>
                <div className="faq-cards-container">
                    {faqs}

                </div>

                <div className="faq-touch-wrapper">
                    <div className="faq-touch-container">
                        <div className="faq-button-container">
                            {/* <button className="faq-touch-button" onClick={contac} >Get in touch</button> */}

                            <div className="faq-touch-button"><Link to="/contact">Get in touch</Link></div>
                        </div>
                        <div>
                            <div className="faq-touch-title">
                                Still have questions?
                            </div>
                            <div className="faq-touch-text">
                                Can't find the answer you're looking for? please chat to our friendly team.
                            </div>
                        </div>

                    </div>
                </div>

            </div>



            <Footer />
        </div>
    )
};

export default Faq;
