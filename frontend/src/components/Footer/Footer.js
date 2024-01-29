import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Footer.css';

//NEED ADD handleSubmit function to post the email address to database subscribeEmail collection

const Footer = () => {
  const { t } = useTranslation(["footer"]);
  return (
    <div className='footer'>
      <div className="newsletter">
      
         <h3>{t('sign_up_title1')}</h3>
            <form className='newsletter-form'>
                <input type="email" />
                <button className='btn'>{t('SUBSCRIBE')} </button> 
            </form>
      </div>
     <div className="footer-bottom">
        <div className="footer-links">
                <div className="footer-link-group">
                   
                    <div className="link-items">
                    <div className="link-items-title"><h4>{t('CUSTOMER_SERVICE')} </h4></div>
                        <ul>
                            <li>{t('sub_title1')} </li>
                            <li>
                            <a href="/faq">{t('sub_title2')} </a>
                            </li>
                            <li>{t('sub_title3')}</li>

                        </ul>
                    </div>
                </div>

                <div className="footer-link-group">
                   
                    <div className="link-items">
                    <div className="link-items-title"><h4>{t('COMPANY')}</h4></div>
                        <ul>
                            <li>                            
                            <a href="/termsconditions">{t('sub_title4')}</a>
                            </li>
                            <li>{t('sub_title5')}</li>
                            <li>{t('sub_title6')}</li>
                            <li>
                              <Link to="/adminportal">{t('sub_title7')}</Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
        
        </div>

        <div className="rights"><p>{t('copy_right')}</p></div>
     </div>
     

    </div>
  )
}

export default Footer 