import React, { useState, useEffect } from "react";
import "../../UserReviews/createReviews.css";
import axios from "axios";
const SearchReviews = (props) => {
  const data = props.data;
  const input = props.input;
  const dateFunction = () => {
    const date = new Date().toISOString();
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  let now = dateFunction();

  const review = data.filter(
    (review) => review._id === input || review.product_id === Number(input)
  );

  console.log(review);

  const [formdata, setFormData] = useState({
    product_id: "",
    user_id: review[0].user_id,
    user_name: review[0].user_name,
    rate: 5,
    title: "Great Proudcts",
    date: now,
    country: "Canada",
    text: "",
  });

  console.log(formdata.product_id);

  if (review.length === 0) {
    return (
      <>
        <div className="review-container">
          <p>Review with review ID : {input} not found</p>
        </div>
      </>
    );
  }

  const handleChange = (e) => {
    const { value, name } = e.target;

    let parsedValue = value;

    if (name === "product_id" || name === "rate") {
      parsedValue = parseInt(value);

      if (isNaN(parsedValue)) {
        parsedValue = 0;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e, id, productId) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      product_id: productId,
    }));
    await UpdateReview(formdata, id);
    console.log(formdata);
  };

  const UpdateReview = async (formdata, id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/reviews/update/${id}`,
        formdata
      );

      props.setUpdateUI((prevState) => !prevState);

      console.log("Review created:", response.data);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const deleteReview = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/reviews/delete/${id}`
      );
      console.log(response);


      
      props.setUpdateUI((prevState) => !prevState);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const reviewcard = review.map((item, index) => {
    return (
      <>
        <div className="reveiw-result" key={index}></div>
        <form
          className="review-form"
          onSubmit={(e) => handleSubmit(e, item._id, item.product_id)}
        >
          <h5>No.{index + 1}</h5>
          <div className="review-box1">
            <div className="review-item review-select-box">
              <label htmlFor="product_id">Product Id</label>
              <input
                type="text"
                id="productId"
                name="rate"
                value={item.product_id}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="review-item">
              <label htmlFor="rate">rate</label>
              <input
                type="text"
                id="rate"
                name="rate"
                placeholder={item.rate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="review-item">
            <label htmlFor="reviewid">review id</label>
            <input
              type="text"
              id="review_id"
              name="review_id"
              value={item._id}
              readOnly
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={item.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrap ">
            <label htmlFor="text">Content</label>
            <textarea
              id="text"
              name="text"
              rows="4"
              cols="50"
              placeholder={item.text}
              onChange={handleChange}
            />
          </div>
         
        </form>
      </>
    );
  });

  return (
    <>
      <div className="review-container">
        <form className="review-form">
          <h3>Search result</h3>
          {reviewcard}
        </form>
      </div>
    </>
  );
};

export default SearchReviews;
