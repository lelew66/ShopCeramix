
const express = require("express");
const reviewRouter = express.Router();
const Review = require("../models/ReviewModel");

// get reviews data from db
reviewRouter.get("/", async (req, res) => {
  try {
    const { userName } = req.query;
    let reviews;
    if (userName) {
      reviews = await Review.find({ "user.name": userName });
    } else {
      reviews = await Review.find();
    }
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: err.message,
    });
  }
});

//get one reivew
reviewRouter.get("/get/:id", async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    if (!review) {
      res.status(404).json({ success: false, message: "Review not found" });
    } else {
      res.status(200).json({ success: true, data: review });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: err.message,
    });
  }
});

//get reviews by product
reviewRouter.get("/get/productviews/:id", async (req, res) => {
  try {
    const review = await Review.find({ product_id: Number(req.params.id) });
    if (!review) {
      res.status(404).json({ success: false, message: "Review not found" });
    } else {
      res.status(200).json({ success: true, data: review });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: err.message,
    });
  }
});
// get reviews from one user
reviewRouter.get("/username/:username", async (req, res) => {
  try {
    const review = await Review.find({
      user_name: String(req.params.username),
    });
    if (!review) {
      res.status(404).json({ success: false, message: "Review not found" });
    } else {
      res.status(200).json({ success: true, data: review });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: err.message,
    });
  }
});

//create a new review record
reviewRouter.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const { product_id, user_id, user_name, rate, title, date, country, text } =
      req.body;
    if (
      !product_id ||
      !user_id ||
      !user_name ||
      !rate ||
      !title ||
      !date ||
      !country ||
      !text
    ) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields in the request body",
      });
    }
    const data = new Review(req.body);
    await data.save();

    res.status(200).send({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({
      success: false,
      message: "Error saving data",
      error: error.message,
    });
  }
});
//create many
reviewRouter.post("/createMany", async (req, res) => {
  try {
    const reviewsToCreate = req.body;

    if (!Array.isArray(reviewsToCreate) || reviewsToCreate.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body. Please provide an array of reviews.",
      });
    }

    const result = await Review.insertMany(reviewsToCreate);

    res.status(201).json({
      success: true,
      message: "Reviews created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating reviews",
      error: err.message,
    });
  }
});

// update a review record
reviewRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating data",
      error: error.message,
    });
  }
});

//delete a review record
reviewRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Review.deleteOne({ _id: id });

    if (data.deletedCount === 1) {
      res
        .status(200)
        .send({ success: true, message: "Data deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "Review not found" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting data",
      error: err.message,
    });
  }
});

//delete all
reviewRouter.delete("/delete", async (req, res) => {
  try {
    const result = await Review.deleteMany({});

    if (result.deletedCount > 0) {
      res
        .status(200)
        .send({ success: true, message: "All data deleted successfully" });
    } else {
      res
        .status(404)
        .send({ success: false, message: "No reviews found to delete" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting data",
      error: err.message,
    });
  }
});

module.exports = reviewRouter;