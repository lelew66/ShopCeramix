import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import DashboradReviewCard from "../AdminDashboard/Reviewboard/Reviewboard ";
import Navbar from "../Navbar";
import "./userReviews.css";
import axios from "axios";
import CreateReviews from "./CreateReviews";
import SearchReviews from "./SearchReviews";
import Promo from "../Promo/Promo";

const ReviewDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showbtn, setShowbtn] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const [input, setInput] = useState(null);

  const { user } = useAuthContext();

  const [productList, setproductList] = useState([]);

  useEffect(() => {
    const userName = user ? user.username : null;
    console.log("User:", user);
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/reviews/username/${userName}`)
        .then((data) => {
          if (Array.isArray(data.data.data)) {
            setReviews(data.data.data);
          } else {
            console.error("Invalid data format from the API");
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [updateUI, user]);
  
  useEffect(() => {
    const uniqueProductIds = [
      ...new Set(reviews.map((item) => item.product_id)),
    ];
    setproductList(uniqueProductIds);
    console.log(productList);
  }, [reviews]);

  console.log(productList);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleAdd = () => {
    setShowAdd(true);
    setShowbtn(true);
  };

  const handleSearch = () => {
    setShowSearch(true);
    setShowbtn(true);
  };

  const handleCloseModals = () => {
    setShowSearch(false);
    setShowAdd(false);
    setShowbtn(false);
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
    <><Promo/>
      <Navbar />
      <div className="dashboard-wrapper">
        <div className="dashboard-mian">
          
          <div className="dashboard-body">
            <div className="dashboard-top">
              <div className="dashboard-main-title">
                <h4 className="dashboard-title">Review List</h4>
                <div className="searchBar-box">
            <input
              type="text"
              className="searchBar"
              placeholder="search by Review ID or Proudct ID..."
              onChange={handleChange}
            ></input>
            <input
              type="button"
              className="search-btn"
              value="Search"
              onClick={() => handleSearch()}
            ></input>
          </div>
                <input
                  type="button"
                  className="add-new-review-btn search-btn"
                  value="ADD"
                  onClick={() => handleAdd()}
                ></input>
              </div>
            </div>
            {showAdd && productList && (
              <div className="edit-container">
                <CreateReviews
                  list={productList}
                  userName={reviews[0].user_name}
                  userId={reviews[0].user_id}
                  setUpdateUI={setUpdateUI}
                />
              </div>
            )}
            {showSearch && productList && (
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
            {showbtn && (
              <input
                type="button"
                className="search-btn btn-blue"
                value="Close"
                onClick={handleCloseModals}
              ></input>
            )}

            <table className="review-list">
              <thead>
                <tr>
                  <th className="table-head">Id</th>
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
