import express from 'express';
import isLogin from '../middlewares/isLogin.js';
import { createCategory, deletecategory, getAllCategory, getcategory, updateCategory } from '../controller/categoryContrl.js';
import uploadCategory from '../config/categoryFileUpload.js';
import isAdmin from '../middlewares/isAdmin.js';

const categoryRoutes = express.Router();

categoryRoutes.post("/",isLogin,isAdmin,uploadCategory.single("file"),createCategory);
categoryRoutes.get("/",getAllCategory);
categoryRoutes.get("/:id",getcategory);
categoryRoutes.put("/:id",isLogin,isAdmin,updateCategory);
categoryRoutes.delete("/:id",isLogin,isAdmin,deletecategory);
export default categoryRoutes;