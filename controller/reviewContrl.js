import AsyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";
export const createReview = AsyncHandler(async (req,res)=>{
    const userID = req.userAuthId;
    const productID = req.params.id;
    const {message,rating} = req.body;
    const review = new Review({user : userID, product: productID,message,rating});
    const product = await Product.findById(productID).populate("reviews");
    const reviewAlready = product.reviews.some(element => element?.user?.toString() === req?.userAuthId?.toString() );
    if(reviewAlready) throw new Error("You have already reviewed")
    console.log(reviewAlready);
    if(product){
        product.reviews.push(review);
        product.save();
    }else{
        throw new Error("Product not found")
    }
    review.save();
    res.status(201).json({
        status:"success",
        review: review,
        msg: "Review created successfully",
    }
    )
})