import React, { useEffect, useState } from "react";
import DashboradReviewCard from "./Reviewboard ";
import "./ReviewDashboard.css";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import SearchReviews from "./SearchReview";

const ReviewDashboard = () => {
  const [reviews, setReviews] = useState([]);

  const { user } = useAuthContext();
  const [input, setInput] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showbtn, setShowbtn] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const [productList, setproductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await  axios
      .get(`${process.env.REACT_APP_SERVER_URL}/reviews`)
      .then((data) => {
        if (Array.isArray(data.data.data)) {
          setReviews(data.data.data);
        } else {
          console.error("Invalid data format from the API");
        }
      })
      .catch((err) => console.log(err));
  }
  fetchData();
  },[user]);

useEffect(() => {
    const uniqueProductIds = [
      ...new Set(reviews.map((item) => item.product_id)),
    ];
    setproductList(uniqueProductIds);
    console.log(productList);
  }, [reviews]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSearch = () => {
    setShowSearch(true);
    setShowbtn(true);
  };
 const handleCloseModals = () => {
    setShowSearch(false);
    setShowAdd(false);

  };
  const card = reviews.map((review) => {
    return (
      <DashboradReviewCard
        key={review.id}
        id={review._id}
        product_id={review.product_id}
        title={review.title}
        rate={review.rate}
        country={review.country}
        date={review.date}
        text={review.text}
      />
    );
  });
  return (
    <>
      
      <div className="dashboard-wrapper">
        <div className="dashboard-mian">
          <div className="dashboard-body">
            <div className="dashboard-top">
              <div className="dashboard-main-title">
                <div className="searchBar-box">
            <input
              type="text"
              className="searchBar"
              placeholder="search by Review ID ..."
              onChange={handleChange}
            ></input>
            <input type="button" className="search-btn" value="Search" onClick={() => handleSearch()}></input>
            {showbtn && (
              <input
                type="button"
                className="search-btn btn-blue"
                value="Close"
                onClick={handleCloseModals}
              ></input>
            )}
          </div>
          
              </div>
            </div>
            {showSearch && (
              <div className="edit-container">
                <SearchReviews
                  data={reviews}
                  list={productList}
                  input={input}
                  userName={reviews[0].user_name}
                  userId={reviews[0].user_id}
                  setUpdateUI={setUpdateUI}
                />
              </div>
            )}
            
            <table className="review-list">
              <thead>
                <tr>
                  <th className="table-head">Review Id</th>
                  <th className="table-head">Proudct Id</th>
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
