import Coupon from "../model/Coupon.js";
import AsyncHandler from "express-async-handler";
//create a new coupon
// POST /api/v1/coupons
// pricate/admin

export const createCoupon = AsyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  //check is admin

  //check coupon
  const couponExists = await Coupon.findOne({ code });
  if (couponExists) {
    throw new Error("Coupon already exists");
  }
  if (isNaN(discount)) throw new Error("Discount value must be a number");
  try {
    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      startDate,
      endDate,
      user: req.userAuthId,
      discount,
    });
    res.status(201).json({
      status: "success",
      coupon: coupon,
      msg: "Coupon created successfull",
    });
  } catch (error) {
    throw error;
  }
});
//fetch all coupon
// GET /api/v1/coupons
// public
export const getAllCoupons = AsyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({
      status: "success",
      coupons,
      msg: "Coupon fetched successfull",
    });
  } catch (error) {
    throw error;
  }
});
//fetch one
// GET /api/v1/coupons/:id
// public

export const getCoupon = AsyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if(!coupon){
      throw new Error("Coupon not found");
    }
    res.status(200).json({
      status: "success",
      coupon,
      msg: "Coupon fetched successfull",
    });

});
//update coupon
// PUT/api/v1/coupons
// pricate/admin
export const updateCoupon = AsyncHandler(async (req, res) => {
  try {
    const { code, startDate, endDate, discount } = req.body;
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, {
      code : code?.toUpperCase(),
      startDate,
      endDate,
      discount,
    },{new : true});
    if(!coupon){
      throw new Error("Coupon not found");
    }
    res.status(200).json({
      status: "success",
      coupon,
      msg: "Coupon updated successfull",
    });
  } catch (error) {
    throw error;
  }
});
//delete coupon
// POST /api/v1/coupons
// pricate/admin
export const deleteCoupon = AsyncHandler(async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      msg : "Coupon deleted",
    })
  } catch (error) {
    throw error;
  }
});
