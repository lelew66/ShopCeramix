import React from 'react';
import {Link} from 'react-router-dom';
import Stars from "./Stars";



const RecommandCard= (props) => {

  return (

    <div className="card recommand-card">
        <div className="card-image recommand-card-image">
          <Link to={`/ProductDetails/${props.id}`}> 
            <img className="porduct-images"  src={props.imgURL} alt="product-image"/>
          </Link>
        </div>
        <div className="card-body recommand-card-body">
            <h3 className="card-title">{props.name}</h3>
            <div className="rate-stars">
               <span className="stars-box">   
               <Stars 
               rate={props.rate}
              /></span>
                <span className='rate'>{props.rate}</span>
                <span className='review-number'>({props.numberOfViews})reviews</span>
            </div> 
        </div>
    </div>

  )
}

export default RecommandCard