import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import AsyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/Coupon.js";

// create order
//POST /api/v1/orders
//private

//stripe
const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);
export const createOrder = AsyncHandler(async (req, res) => {
  // get order payload
  const { orderItems, shippingAddress, totalPrice } = req.body;
  const user = await User.findById(req.userAuthId);
  if (!user.hasShippingAddress)
    throw new Error("Please update your shipping address");
  if (orderItems?.length <= 0) {
    throw new Error("No order items found");
  }
  let discount = 1;
  if (req?.query?.code) {
    const coupon = await Coupon.findOne({ code: req.query.code.toUpperCase() });
    if (!coupon) throw new Error("coupon invalid");
    if (coupon.isExpire) new Error("coupon expired");
    discount = coupon.discount / 100;
  }
  //update quantity
  orderItems.forEach(async (orderItem) => {
    const product = await Product.findOne({ _id: { $in: orderItem } });
    product.totalSold += orderItem.totalQtyBuying;
    await product.save();
  });
  //create order
  const order = new Order({
    user: user.id,
    orderItems,
    shippingAddress,
    totalPrice: totalPrice * discount,
  });
  user.orders.push(order);
  await order.save();
  await user.save();
  const orderItemStripe = orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.totalQtyBuying,
    };
  });
  // make payment
  const session = await stripe.checkout.sessions.create({
    line_items: orderItemStripe,
    metadata: {
      order_id: JSON.stringify(order.id),
    },
    mode: "payment",
    success_url: "https://localhost:3000/success",
    cancel_url: "https://localhost:3000/cancel",
  });
  res.send({
    url: session.url,
  });
});
// get all order
//POST /api/v1/orders
//private

export const getAllordersCtrl = AsyncHandler(async (req, res) => {
  const order = await Order.find();
  res.status(200).json({
    status: "success",
    order,
    msg: " Order fetched successfully",
  });
});

// get one order
//POST /api/v1/orders/:id
//private

export const getSingleOrderCtrl = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new Error("Order not found");
  res.status(200).json({
    status: "success",
    order,
    msg: "Order fetched successfully",
  });
});

// get one order
//PUT /api/v1/orders/update/:id
//private

export const updateOrder = AsyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    order,
    msg: "Order updated successfully",
  });
});
// get sales sum of orders
//PUT /api/v1/orders/sales/sum
//private/admin
export const getSaleStats = AsyncHandler(async (req, res) => {
  const orderSum = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
        minSale: {
          $min: "$totalPrice",
        },
        maxSale: {
          $max: "$totalPrice",
        },
        averageSale: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todaySale = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: today },
      },
    },
    {
      $group: {
        _id: null,
        todaySales: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    orderSum,
    todaySale,
    msg: "get sales sum successfully",
  });
});
