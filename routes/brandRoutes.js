import express from 'express';
import isLogin from '../middlewares/isLogin.js';
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from '../controller/brandContrl.js';
import isAdmin from '../middlewares/isAdmin.js';

const brandRoutes = express.Router();

brandRoutes.post("/",isLogin,isAdmin,createBrand);
brandRoutes.get("/",getAllBrands);
brandRoutes.get("/:id",getBrand);
brandRoutes.put("/:id",isLogin,isAdmin,updateBrand);
brandRoutes.delete("/:id",isLogin,isAdmin,deleteBrand);
export default brandRoutes;