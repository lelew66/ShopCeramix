const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  user_id: { type: String, required: true },
  user_name: { type: String, required: true, default: "Apple" },
  rate: { type: Number, required: true, default: 0 },
  title: { type: String, required: true, default: "" },
  date: {
    type: String,
    required: true,
  },
  country: { type: String, required: true, default: "Canada" },
  text: { type: String, required: true, default: "" },
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;