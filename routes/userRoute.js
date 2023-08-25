import express from 'express';
import  {registerUserCtrl,loginCtrl,getUserProfileCtrl, updateShippingAddressCtrl} from "../controller/userContrl.js";
import isLogin from '../middlewares/isLogin.js';
const userRoutes = express.Router();
userRoutes.post("/register",registerUserCtrl);
userRoutes.post("/login",loginCtrl);
userRoutes.get("/profile",isLogin,getUserProfileCtrl);
userRoutes.put("/update/shipping",isLogin,updateShippingAddressCtrl);
export default userRoutes;