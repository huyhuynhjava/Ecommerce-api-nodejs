import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import userRoutes from "../routes/userRoute.js";
import productRoutes from "../routes/productRoute.js";
import categoryRoutes from "../routes/categoryRoute.js";
import express from "express";
import dbConnection from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middlewares/globalErrHandler.js";
import brandRoutes from "../routes/brandRoutes.js";
import colorRoutes from "../routes/colorRoutes.js";
import reviewRoutes from "../routes/reviewRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import Order from "../model/Order.js";
import couponRoute from "../routes/couponRoute.js";
const app = express();
//Stripe webhook
const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_4b4d55f0adbf805426f66f3f9b2d7ff6832a3a958af197e2e16552fa69e4df74";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { order_id } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalPrice = session.amount_total;
      const currecy = session.currency;
      const order = await Order.findByIdAndUpdate(
        JSON.parse(order_id),
        {
          paymentStatus,
          paymentMethod,
          totalPrice : totalPrice/100,
          currecy,
        },
        { new: true }
      );
      console.log(order);
    } else return;
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
app.use(express.json());
dbConnection();

//routes
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/categories/", categoryRoutes);
app.use("/api/v1/brands/", brandRoutes);
app.use("/api/v1/colors/", colorRoutes);
app.use("/api/v1/reviews/", reviewRoutes);
app.use("/api/v1/orders/", orderRoutes);
app.use("/api/v1/coupons/", couponRoute);

app.use(notFound);
app.use(globalErrhandler);
export default app;
