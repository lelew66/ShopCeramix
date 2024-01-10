
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import { getHours } from "date-fns";

import OrdersTable from "../components/Order/OrdersTable";
import Navbar from "../components/Navbar";
import Promo from "../components/Promo/Promo";
import Footer from "../components/Footer/Footer";

const MyAccount = () => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const orders = [
    //THIS IS ONLY FOR TEST.we will pass the real data after the orders collection being setup in mongodb.
    {
      id: 5641,
      orderDate: "2023-07-02",
      orderNumber: 26260,
      totalPrice: 394.4,
      totalItems: 10,
      status: "Shipped",
    },
    {
      id: 2178,
      orderDate: "2022-01-30",
      orderNumber: 43930,
      totalPrice: 238.25,
      totalItems: 3,
      status: "Pending",
    },
    {
      id: 8064,
      orderDate: "2022-05-28",
      orderNumber: 44489,
      totalPrice: 439.95,
      totalItems: 3,
      status: "Shipped",
    },
    {
      id: 7507,
      orderDate: "2023-09-19",
      orderNumber: 27223,
      totalPrice: 460.33,
      totalItems: 5,
      status: "Shipped",
    },
    {
      id: 1086,
      orderDate: "2022-05-22",
      orderNumber: 53901,
      totalPrice: 186.39,
      totalItems: 2,
      status: "Pending",
    },
    {
      id: 3050,
      orderDate: "2023-05-22",
      orderNumber: 81329,
      totalPrice: 274.54,
      totalItems: 10,
      status: "Pending",
    },
    {
      id: 5111,
      orderDate: "2022-08-17",
      orderNumber: 37005,
      totalPrice: 464.79,
      totalItems: 8,
      status: "Delivered",
    },
    {
      id: 3699,
      orderDate: "2022-09-08",
      orderNumber: 16370,
      totalPrice: 256.14,
      totalItems: 10,
      status: "Delivered",
    },
    {
      id: 2339,
      orderDate: "2022-06-26",
      orderNumber: 81758,
      totalPrice: 79.78,
      totalItems: 5,
      status: "Shipped",
    },
    {
      id: 2591,
      orderDate: "2022-09-19",
      orderNumber: 68455,
      totalPrice: 332.09,
      totalItems: 6,
      status: "Shipped",
    },
  ];

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = getHours(currentTime);

    if (currentHour >= 5 && currentHour < 12) {
      setTimeOfDay("Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setTimeOfDay("Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setTimeOfDay("Evening");
    } else {
      setTimeOfDay("Night");
    }

    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="page-container">
      <Promo />
      <Navbar />
      {user && (
        <div className="page-content">
          <h2>
            Good {timeOfDay},{" "}
            {(
              user.username || user.email.substring(0, user.email.indexOf("@"))
            ).toUpperCase()}
            !
          </h2>
          <h5 className="page-subtitle">Your Order History</h5>
          <h5 className="page-subtitle">
            <Link to="/userReviews">Reviews</Link>
          </h5>
          <OrdersTable data={orders} />
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyAccount;