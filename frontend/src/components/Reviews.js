import React from "react";
import Stars from "./Stars";

const Review = (props) => {
  return (
    <div className="reviews-container margin-top-bottom">
       <span className="stars-box">   
          <Stars 
            rate={props.rate}/>
        </span>
      <span className="title-reviews">{props.title}</span>
      <p className="subtitle-reviews ">
        Reviewed in {props.country} on {props.date}
      </p>
      <p className="margin-top-bottom-20">{props.text}</p>
    </div>
  );
};

export default Review;
