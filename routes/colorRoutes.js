import express from 'express';
import isLogin from '../middlewares/isLogin.js';
import { createColor, deletecolor, getAllcolors, getcolor, updatecolor } from '../controller/colorContrl.js';
import isAdmin from '../middlewares/isAdmin.js';

const colorRoutes = express.Router();

colorRoutes.post("/",isLogin,isAdmin,createColor);
colorRoutes.get("/",getAllcolors);
colorRoutes.get("/:id",getcolor);
colorRoutes.put("/:id",isLogin,isAdmin,updatecolor);
colorRoutes.delete("/:id",isLogin,isAdmin,deletecolor);
export default colorRoutes;