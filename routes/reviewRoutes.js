import express from 'express';
import isLogin from '../middlewares/isLogin.js';
import { createReview } from '../controller/reviewContrl.js';

const reviewRoutes = express.Router();

reviewRoutes.post("/:id",isLogin,createReview);

export default reviewRoutes;