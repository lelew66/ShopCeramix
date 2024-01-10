import React from 'react';
import starImage from '../assets/star.png';
import halfStarImage from '../assets/halfStar.png';

const Stars = (props)=>{
    const rateNumber = props.rate;
    const starElements = []; 

      for(let i=1; i<=rateNumber; i++){
       starElements.push (<img  key={i} className="star" src={starImage} alt="star" />)
      }
      if (!Number.isInteger(rateNumber)){
        starElements.push ( <img key="half" className="halfStar" src={halfStarImage} alt="half star" />)
      }

      return starElements

    };

export default Stars