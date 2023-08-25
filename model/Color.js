import mongoose from "mongoose";
const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);
const Color = new mongoose.model("Color", colorSchema);
export default Color;
