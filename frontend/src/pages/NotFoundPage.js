import React from 'react';
import {Link} from 'react-router-dom';
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer/Footer'
const NotFoundPage = () => {
  return (
    <div>
      <Promo />
      <Navbar />
      <div className='notfoundpage'>
            <div className="products-name">404 page</div>
                <Link to="/">
                <input className="button  btn-add-to-cart btn-blue" type="button" value="Home Page" />
                </Link>
        </div>
        <Footer />
      </div>
   
  )
}

export default NotFoundPage;