import React from "react";

const CreateReviews = () => {
  return (
    <>
      <div className="delivery-info">
        <form>
          <h3>creating a new review</h3>
          <div className="row-wrap">
            <div className="input-wrap">
              <label htmlFor="product_id">Product Id</label>
              <input type="text" id="product_id" />
            </div>
            <div className="input-wrap">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" />
            </div>
            <div className="input-wrap">
              <label htmlFor="content">Text</label>
              <input type="text" id="content" />
            </div>
            <div className="input-wrap">
              <label htmlFor="rate">rate</label>
              <input type="text" id="rate" />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateReviews;
