import express from "express";
import isLogin from "../middlewares/isLogin.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controller/productContrl.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";
const productRoutes = express.Router();
productRoutes.post("/", isLogin,isAdmin,upload.array("files"), createProduct);
productRoutes.get("/", getAllProduct);
productRoutes.get("/:id", getOneProduct);
productRoutes.put("/:id", isLogin,isAdmin, updateProduct);
productRoutes.delete("/:id", isLogin,isAdmin, deleteProduct);
export default productRoutes;