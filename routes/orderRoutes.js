import express from 'express';
import isLogin from '../middlewares/isLogin.js';
import { createOrder, getAllordersCtrl,getSaleStats, getSingleOrderCtrl, updateOrder } from '../controller/orderContrl.js';
import isAdmin from '../middlewares/isAdmin.js';

const orderRoutes = express.Router();

orderRoutes.post("/",isLogin,createOrder);
orderRoutes.get("/",isLogin,getAllordersCtrl);
orderRoutes.get("/:id",isLogin,getSingleOrderCtrl);
orderRoutes.post("/",isLogin,createOrder);
orderRoutes.put("/update/:id",isLogin,isAdmin,updateOrder);
orderRoutes.get("/sales/sum",isLogin,getSaleStats);

export default orderRoutes;
