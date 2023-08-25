import AsyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

//@desc create a new Brand
//@route // GET api/v1/brands
//access private
export const createBrand = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  const existBrand = await Brand.findOne({ name });
  if (existBrand) {
    throw new Error("Brand  already exists");
  } else {
    const brand = await Brand.create({
      name: name.toLowerCase(),
      user: req.userAuthId,
    });
    res.status(201).json({
      status: "success",
      msg: "Brand created successfully",
      brand,
    });
  }
});
//@desc get all brand
//@route // GET api/v1/brands
//access public
export const getAllBrands = AsyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({
      status: "success",
      brands,
      msg: "Brands fetched successfully",
    });
  } catch (error) {
    throw error;
  }
});
//@desc get one brand
//@route // GET api/v1/brands
//access public
export const getBrand = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const brand = await Brand.findById(id);
    res.status(200).json({
      status: "success",
      brand,
      msg: "brand fetched successfully",
    });
  } catch (error) {
    throw error;
  }
});
//@desc update brand
//@route // PUT api/v1/brands
//access private
export const updateBrand = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    id,
    { name},
    { new: true }
  );
  if (!brand) throw new Error("Brand not found");
  else {
    res.status(200).json({
      status: "success",
      brand,
      msg: "update brand successfully",
    });
  }
});
//@desc delete brand
//@route // DELETE api/v1/brands
//access private
export const deleteBrand = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    await Brand.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      msg: "Brand deleted successfully",
    });
  } catch (error) {
    throw error;
  }
});
