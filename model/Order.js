import mongoose from "mongoose";
// generate random number
const randomTxt = Math.random().toString(36).substring(7).toUpperCase();
const randomNumber = Math.floor(Math.random() * 90000);
const orderSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User",
    },
    orderItems : [
        {
            type : Object,
            required: true, 
        }
    ],
    shippingAddress:{
        type : Object,
        required: true,
    },
    orderNumber:{
        type:String,
        required: true,
        default: randomTxt + randomNumber,
    },
    paymentStatus:{
        type:String,
        required: true,
        default: "Not paid",
    },
    paymentMethod:{
        type:String,
        required: true,
        default:"Not specified",
    },
    currecy:{
        type:String,
        default:"Not specified",
    },
    totalPrice:{
        type: Number,
        default: 0.0,
    },
    status : {
        type:String,
        default:"Pending",
        enum : ["Pending", "processing", "shipped", "delivered"]
    },
    deliveredAt : {
        type: Date,
    }
},
{
    timestamps:true,
});
const Order = new mongoose.model("Order",orderSchema);
export default Order;