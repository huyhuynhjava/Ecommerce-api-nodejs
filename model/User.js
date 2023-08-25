import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
       
    ],
    wishlists:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WishList"
        },
       
    ],
    isAdmin :{
        type: Boolean,
        default:false,
    },
    hasShippingAddress: {
        type:Boolean,
        default:false,
    },
    ShippingAddress:{
        firstName: {
            type :String,
        },
        lastName: {
            type :String,
        },
        address: {
            type :String,
        },
        city: {
            type :String,
        },
        postalCode: {
            type :String,
        },
        province: {
            type :String,
        },
        country :{
            type :String,
        }
    }
},
{
    timestamps:true
});
const User = new mongoose.model("User",userSchema);
export default User;