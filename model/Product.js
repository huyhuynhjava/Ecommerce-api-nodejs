import mongoose from "mongoose";
const productShema  = new mongoose.Schema(
{
    name: {
        type: String,
        require:true,
    },
    decription: {
        type: String,
        require:true,
    },
    brand: {
        type: String,
        ref : "Brand",
        require:true,
    },
    category: {
        type: String,
        ref: "Category",
        require:true,
    },
    sizes:{
        type : [String],
        enum :["X","M","L","XL","XXL"],
        require:true,
    },
    colors:{
        type : [String],
        require:true,
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User",
    },
    images:[{
        type : String,
        required: true,
    }],
    reviews:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }],
    price: {
        type: Number,
        require:true,
    },
    totalQty: {
        type: Number,
        require:true,
    },
    totalSold: {
        type: Number,
        default: 0,
        require:true,
    },


},
{
    timestamps:true,
    toJSON:{virtuals:true}
})
productShema.virtual("totalReviews").get(function(){
    return this?.reviews.length;
})

productShema.virtual("averageReviews").get(function(){
    let total = 0;
    this?.reviews?.forEach(function(review){
        total += review?.rating;
    })
    return total/this?.reviews.length;
})
productShema.virtual("totalLeft").get(function(){
    return this.totalQty - this.totalSold;
})
const Product = new mongoose.model("Product",productShema);
export default Product;