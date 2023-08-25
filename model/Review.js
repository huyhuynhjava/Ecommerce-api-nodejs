import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true,"Review must belong to a user"]
    },
    product: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require:[true,"Review must belong to a product"]
      },
    message: {
      type: String,
      required: [true,"please enter a message"]
    },
    rating: {
      type: Number,
      required: [true,"please add a rating between 1 and 5"],
      min:1,
      max:5,
    }
  },
  { timestamps: true }
);
const Review = new mongoose.model("Review", reviewSchema);
export default Review;
