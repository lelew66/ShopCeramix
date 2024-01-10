import React from "react";

const AboutCard = (props) => {
  return (
    <div className="about-card">
      <div className="about-card-body">
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
      <div className="imgbox">
        <img className="about-image" src={props.img} alt="about-image" />
      </div>
    </div>
  );
};

export default AboutCard;
