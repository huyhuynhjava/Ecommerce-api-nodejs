import express from 'express';
import isLogin from '../middlewares/isLogin.js';
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from '../controller/couponCtrl.js';
import isAdmin from '../middlewares/isAdmin.js';
const couponRoute = express.Router();
 
couponRoute.post("/",isLogin,isAdmin,createCoupon);
couponRoute.get("/",getAllCoupons);
couponRoute.get("/:id",getCoupon);
couponRoute.put("/:id",isLogin,isAdmin,updateCoupon);
couponRoute.delete("/:id",isLogin,isAdmin,deleteCoupon);

export default couponRoute;