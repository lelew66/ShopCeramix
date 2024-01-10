import {Link} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState,  useContext }  from 'react';
import SiderBarCRUD from './SiderBarCRUD'
import {FaBars} from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
import { ShopContext } from "../context/shop-context";

const NavbarCRUD =() =>{ 

    const [isMenuExtend, setIsMenuExtend] = useState(false)

    const{user} = useAuthContext();

    const { getTotalCartItems} = useContext(ShopContext);

    const totalitems = getTotalCartItems(user);

    const handleClick = () =>{
        setIsMenuExtend(!isMenuExtend);
    }
    
   const handleSideBar = () =>{
    setIsMenuExtend(!isMenuExtend);
   }
    return (
        <header>
            <div className="container">
               <a href="#" className='mobileMenu-toggle' onClick={handleClick}>
               <FaBars />
               </a>
                <nav className={`navPages  ${isMenuExtend? 'menu-extend': ''}`}>
                    <div className='closeButton' onClick={handleSideBar}>
                        <IoIosClose />
                    </div>
                    {isMenuExtend && 
                      <SiderBarCRUD onClose={handleSideBar}/>
                    }
                    {!isMenuExtend && 
                      <>
                        <div><Link to="/CURD">HOME</Link></div>
                        <div><Link to="/CURD/users">USERS</Link></div>
                      </>
                    }
                    {!isMenuExtend && 
                      <>
                        <div><Link to="/CURD/products">PROUDCTS</Link></div>
                        <div><Link to="/CURD/reviews">REVIEWS</Link></div>
                      </>
                    }
                   
                  
                </nav>
                <Link to="/"><h2 className="logo">CERAMIX</h2></Link>
         
                <nav className='navUser'>
                   {user && (
                    <>
                    <div><Link to="/myaccount" className='btn search-btn'>{(user.username || user.email.substring(0, user.email.indexOf('@'))).toUpperCase()}</Link></div>
                    
                    </>
                   )}

                   {!user && (
                    <>
                    <div><Link to="/myaccount"></Link></div>
                    </>
                   )}
                   
                </nav>
            </div>
        </header>
    )
}

export default NavbarCRUD;