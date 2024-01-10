import React, { useContext, useState, useEffect } from "react";
import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer/Footer'
import OrderImg from '../assets/orderConfirmation.png';
import { useAuthContext } from "../hooks/useAuthContext";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/shop-context";


const OrderConfirmation = (props) => {
    const [searchParams] = useSearchParams();
    const sta = searchParams.get('sta');
    // console.log("-->sta:", sta);
    let flag = true;
    if (sta != "success") {
        flag = false;
    }
    //Todo: get the order number, date and amount from the params
    const { user } = useAuthContext();
    const { getCartInfo, getTotalCartAmount } = useContext(ShopContext);

    const [bCreatOrder, setBCreatOrder] = useState(false);


    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getTotalCartAmount(user);
            console.log("====>OrderConfirmation:", data);
            setTotalAmount(data);
            setBCreatOrder(true);

        }
        fetchData();
    }, [user]);

    // const { number, date, amount } = props.order;
    let number = "BXDP12MO";
    let date = new Date().toLocaleDateString(); //"2021-09-15";
    let amount = totalAmount; //"CA$1000";


    //TODO: create order in the backend
    console.log("->OrderConfirmation: user:", user);
    useEffect(() => {

        async function fetchData() {
            if (flag && user) {
                let cartInfo = await getCartInfo(user);
                console.log("->OrderConfirmation: cartInfo:", cartInfo);
                let items = [];
                for (let i = 0; i < cartInfo.length; i++) {
                    items.push({
                        product: cartInfo[i]._id,
                        quantity: cartInfo[i].quantity,
                        price: cartInfo[i].Price,
                    });
                }
                console.log("->OrderConfirmation: items:", items.length);
                if (items.length > 0) {
                    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/orders`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`,
                        },
                        body: JSON.stringify({
                            // user: user.userid,
                            items: items,
                            total: totalAmount,
                        }),
                    });
                }

                //TOD: clear the cart
                let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/shoppingcart`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                console.log("->OrderConfirmation: clear the cart:", res);

            }
        }
        fetchData();
    }, [bCreatOrder, user]);


    return (
        <div className="order-confirmation-page" >
            <Promo />
            <Navbar />


            <div className="order-confirmation-container">
                <div className="order-confirmation-title-container">
                    <div className="order-confirmation-title">
                        CERAMICS
                    </div>
                    <div className="order-confirmation-text">
                        Order confirmation
                    </div>
                </div>
                <div className="order-confirmation-wrapper">

                    <div className="order-confirmation-info-container">
                        <div className="order-confirmation-info-title">
                            Thank you for your purchase!
                        </div>
                        <div className="order-confirmation-info-notice">
                            In a few minutes you will receive an email with the details of your order.
                        </div>

                        <hr className="order-confirmation-info-line"></hr>
                        {!flag && (
                            <>
                                <div className="order-confirmation-info-title" style={{ color: 'red' }}>
                                    Order has been canceled
                                </div>
                            </>
                        )}
                        {flag && (
                            <>
                                <div className="order-confirmation-item">
                                    <div className="order-confirmation-item-title">
                                        Order number
                                    </div>
                                    <div className="order-confirmation-item-text">
                                        {number}
                                    </div>
                                </div>
                                <div className="order-confirmation-item">
                                    <div className="order-confirmation-item-title">
                                        Order date
                                    </div>
                                    <div className="order-confirmation-item-text">
                                        {date}
                                    </div>
                                </div>
                                <div className="order-confirmation-item">
                                    <div className="order-confirmation-item-title">
                                        Total amount
                                    </div>
                                    <div className="order-confirmation-item-text">
                                        {`$ ${totalAmount}`}
                                    </div>
                                </div>
                            </>
                        )}
                        <hr className="order-confirmation-info-line"></hr>

                        <div className="order-confirmation-info-notice">
                            We remind you that during sale and promotions, delivery times may be longer than usual.
                        </div>

                        <div className="order-confirmation-button-container">
                            <button className="order-confirmation-button">Discover the latest</button>
                        </div>
                    </div>
                    <div className="order-confirmation-image-container">
                        <img src={OrderImg} alt="order-confirmation" className="order-confirmation-image" />
                    </div>
                </div>


            </div>


            <Footer />
        </div>
    )
};

export default OrderConfirmation;
