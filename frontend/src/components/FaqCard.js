import React from "react";


const AboutCard = (props) => {   
    return (
        <div className="faq-card">
            <div className="faq-card-icon">
                <img className="faq-image" src={props.icon} alt="faq-icon" />
                
            </div>
            <div className="faq-card-body">
                <p className="faq-card-question">{props.question}</p>
                <p className="faq-card-answer">{props.answer}</p>
            </div>            
        </div>
    );
};

export default AboutCard;
