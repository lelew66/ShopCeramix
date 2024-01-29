
import React, { useState } from 'react'
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import Promo from '../components/Promo/Promo';
import HomeDecor from '../assets/homeDecor.png';
import RedVasse from '../assets/RedVasse.png';
import drinkSet from '../assets/drinkSet.png';
import pinkTeaset from '../assets/pinkTeaset.png';
import tableWare from '../assets/tableWare.png';
import greenPlate from '../assets/greenPlate.png';
import { useTranslation } from "react-i18next";
import i18next from "i18next";


export default function Home () {
    const [marginTop, setMarginTop] = useState();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const { t, i18n } = useTranslation(['home']);

    useEffect(() => {
        document.body.classList.toggle('no-scroll', isMobile);
        // Remove the class when the component unmounts because i only want the home page a no-scroll page
        return () => {
          document.body.classList.toggle('no-scroll', false);
        };
      }, [isMobile]);
      

      useEffect(()=> {

        const handleResize = () =>{
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
        
            setMarginTop(viewportHeight > 877 ? '240px' : '110px');
            setIsMobile(window.innerWidth <= 767);

            if (viewportWidth > 767) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
          };
        
      }, []);

    


  return (
    <>
       <Promo />
       <Navbar />
       <div className="page-content" style={{marginTop}}>
           <div className="slogan">
            <h2>{t("text1")}</h2>
            <h2>{t("text2")}</h2>
            <h5>{t("text3")}</h5>
           </div>

           <div className="product-category" >
            {/* <Link to="/homedecor" className="subCategory"> */}
            <Link to={{ pathname: '/tableware', search: `?type=Decor` }}  className="subCategory">
               <div className='categoryIcon'>
                  <img src={HomeDecor} alt="" style={{width:'50px'}} />
                  <h4 style={{fontFamily: `var(--font-base)`, fontWeight:'normal', color:'#c40202'}}>{t("DECOR")}</h4>
                  <img style={{width:'280px'}} src={RedVasse} alt="homedecor" />
               </div>
             </Link>

            {/* drinkset */}
            <Link to={{ pathname: '/tableware', search: `?type=Drink` }}  className="subCategory">
               <div  className='categoryIcon'>
                  <img src={drinkSet} alt="" style={{width:'50px'}} />
                  <h4 style={{fontFamily: `var(--font-base)`, fontWeight:'normal', color:'#772f67'}}>{t("DRINK")}</h4>
                  <img style={{width:'280px'}} src={pinkTeaset} alt="drinkset" />
               </div>
             </Link>

            <Link to={{ pathname: '/tableware', search: `?type=Tableware` }}  className="subCategory">
                <div  className='categoryIcon'>
                    <img src={tableWare} alt="" style={{width:'50px'}} />
                    <h4 style={{fontFamily: `var(--font-base)`, fontWeight:'normal', color:'#6baaca'}}>{t("TABLEWARE")} </h4>
                    <img style={{width:'280px'}} src={greenPlate} alt="tableware" />
                </div> 
             </Link>
           </div>
          

           <div style={{background:'white', height:'220px', transform: 'translateY(-180px)', zIndex:'0'}} className="white-backdrop"></div>
       </div>
    </>
  )
}
