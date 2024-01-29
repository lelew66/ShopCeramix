import { Link } from "react-router-dom";
import { useAuthContext } from "../../../src/hooks/useAuthContext";
import { useState, useContext,useEffect  } from "react";
import SideBar from "../SideBar";
import { FaBars } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import './navbar.css';


const Navbar = () => {
  const { i18n, t } = useTranslation(["navbar"]);

  const [isMenuExtend, setIsMenuExtend] = useState(false);

  const { user } = useAuthContext();

  const { getTotalCartItems, cartNeedUpdate } = useContext(ShopContext);

  let needUpdate = cartNeedUpdate();
  const [totalitems, setTotalitems] = useState(0);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setTotalitems(await getTotalCartItems(user));
    }
    fetchData();
  }, [totalitems, needUpdate]);
  // const totalitems = getTotalCartItems();

  const handleClick = () => {
    setIsMenuExtend(!isMenuExtend);
  };

  const handleSideBar = () => {
    setIsMenuExtend(!isMenuExtend);
  };
  
	useEffect(() => {
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("en");
		}
	}, []);

	const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};
  
  return (
    <header>
      <div className="container">
        <a href="#" className="mobileMenu-toggle" onClick={handleClick}>
          <FaBars />
        </a>
        <nav className={`navPages  ${isMenuExtend ? "menu-extend" : ""}`}>
          <div className="closeButton" onClick={handleSideBar}>
            <IoIosClose />
          </div>
          {isMenuExtend && <SideBar onClose={handleSideBar} />}
          {!isMenuExtend && (
            <>
              <div>
                <Link  to="/about" className="navbar-link">{t('about')}</Link>
              </div>
              <div>
                <Link to="/contact" className="navbar-link">{t('contact')}</Link>
              </div>
            </>
          )}
        </nav>
        <Link to="/">
          <h2 className="logo">CERAMIX</h2>
        </Link>
        <nav className="navUser">
          {user && (
            <>
              <div>
                <Link to="/myaccount" className="btn">
                  {(
                    user.username ||
                    user.email.substring(0, user.email.indexOf("@"))
                  ).toUpperCase()}
                </Link>
              </div>
              <div>
                <Link to="/mycart">
                {t('cart')}
                  {totalitems !== 0 && (
                    <span className="cartCount ">{totalitems}</span>
                  )}{" "}
                </Link>
              </div>
            </>
          )}

          {!user && (
            <>
              <div>
                <Link to="/myaccount" className="navbar-link">{t('acount')}</Link>
              </div>
              <div>
                <Link to="/mycart" className="navbar-link">
                {t('my_cart')}
                  {totalitems !== 0 && (
                    <span className="cartCount">{totalitems}</span>
                  )}
                </Link>
              </div>
            </>
          )}
          <div className="lang_box">
          <select
							className="select-language"
							value={localStorage.getItem("i18nextLng")}
							onChange={handleLanguageChange}
						>
							<option value="en">English</option>
							<option value="fr">Français</option>
						</select>
          </div>
        </nav>
        
      </div>
    </header>
  );
};

export default Navbar;
