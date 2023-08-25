import AsyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";
import Color from "../model/Color.js";

//@desc create a new color
//@route // GET api/v1/colors
//access private
export const createColor = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  const existColor = await Color.findOne({ name });
  if (existColor) {
    throw new Error("color  already exists");
  } else {
    const color = await Color.create({
      name: name.toLowerCase(),
      user: req.userAuthId,
    });
    res.status(201).json({
      status: "success",
      msg: "color created successfully",
      color,
    });
  }
});
//@desc get all color
//@route // GET api/v1/colors
//access public
export const getAllcolors = AsyncHandler(async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).json({
      status: "success",
      colors,
      msg: "colors fetched successfully",
    });
  } catch (error) {
    throw error;
  }
});
//@desc get one color
//@route // GET api/v1/colors
//access public
export const getcolor = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const color = await Color.findById(id);
    res.status(200).json({
      status: "success",
      color,
      msg: "color fetched successfully",
    });
  } catch (error) {
    throw error;
  }
});
//@desc update color
//@route // PUT api/v1/colors
//access private
export const updatecolor = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const color = await Color.findByIdAndUpdate(
    id,
    { name},
    { new: true }
  );
  if (!color) throw new Error("color not found");
  else {
    res.status(200).json({
      status: "success",
      color,
      msg: "update color successfully",
    });
  }
});
//@desc delete color
//@route // DELETE api/v1/colors
//access private
export const deletecolor = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    await Color.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      msg: "color deleted successfully",
    });
  } catch (error) {
    throw error;
  }
});
