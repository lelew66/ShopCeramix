import React, { useState } from "react";
import "./createReviews.css";
import axios from "axios";

const CreateReviews = (props) => {
  const defaultProductId = parseInt(props.list[0], 10);
  const userName = props.userName;
  const userId = props.userId;

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

  console.log(props.list);
  const [formdata, setFormData] = useState({
    product_id: defaultProductId,
    user_id: userId,
    user_name: userName,
    rate: 5,
    title: "Great Product",
    date: now,
    country: "Canada",
    text: "",
  });

  const defaultFormData = {
    product_id: defaultProductId,
    user_id: now,
    user_name: userName,
    rate: 5,
    title: "Great Product",
    date: now,
    country: "Canada",
    text: "",
  };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    addReview(formdata);
    console.log(formdata);
  };

  const addReview = async (formdata) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/reviews/create`,
        formdata
      );
      console.log("Review created:", response.data);
      setFormData(defaultFormData);
      props.setUpdateUI((prevState) => !prevState);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <>
      <div className="review-container">
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Add a review</h3>
          <div className="review-box1">
            <div className="review-item review-select-box">
              <label htmlFor="product_id">Product Id</label>
              <select
                required
                className="review-select"
                id="product_id"
                name="product_id"
                value={formdata.product_id}
                onChange={handleChange}
              >
                {props.list.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="review-item">
              <label htmlFor="rate">rate</label>
              <input
                required
                type="text"
                id="rate"
                placeholder="5"
                name="rate"
                value={formdata.rate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-wrap">
            <label htmlFor="title">Title</label>
            <input
              required
              type="text"
              id="title"
              name="title"
              value={formdata.title}
              placeholder="Great Product"
              onChange={handleChange}
            />
          </div>
          <div className="input-wrap ">
            <label htmlFor="text">Content</label>
            <textarea
              required
              id="text"
              name="text"
              rows="4"
              cols="50"
              value={formdata.text}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateReviews;
