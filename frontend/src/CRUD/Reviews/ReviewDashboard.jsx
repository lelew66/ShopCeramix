import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faUser,faHouse,faBookmark,faCircleUser,faCartShopping,faStar, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import DashboradReviewCard from "../../components/AdminDashboard/Reviewboard/Reviewboard ";
import "./ReviewDashboard.css";
import axios from "axios";
import NavbarCRUD from "../NavbarCRUD";


const ReviewDashboard = () => {
  const [reviews, setReviews] = useState([]);

  const card = reviews.map((review) => {
    return (
      <DashboradReviewCard
        key={review.id}
        id={review.id}
        product_id={review.product_id}
        title={review.title}
        rate={review.rate}
        country={review.country}
        date={review.date}
        text={review.text}
      />
    );
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/reviews`)
      .then((data) => {
        if (Array.isArray(data.data.data)) {
          setReviews(data.data.data);
        } else {
          console.error("Invalid data format from the API");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavbarCRUD />
      <div className="dashboard-wrapper">
        <div className="dashboard-mian">
          <div className="searchBar-box">
            <input
              type="text"
              className="searchBar"
              placeholder="search by ID ..."
            ></input>
            <input type="button" className="search-btn" value="Search"></input>
          </div>
          <div className="dashboard-body">
            <div className="dashboard-top">
              <div className="dashboard-main-title">
                <h4 className="dashboard-title">Review List</h4>
                <input
                  type="button"
                  className="add-new-review-btn search-btn"
                  value="ADD NEW REVIEW"
                ></input>
              </div>
            </div>
            <table className="review-list">
              <thead>
                <tr>
                  <th className="table-head">ID</th>
                  <th className="table-head">Proudct ID</th>
                  <th className="table-head">Title</th>
                  <th className="table-head">Rate</th>
                  <th className="table-head">Country</th>
                  <th className="table-head">Date</th>
                  <th className="table-head">Content</th>
                </tr>
              </thead>
              <tbody className="table-body">{card}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewDashboard;
