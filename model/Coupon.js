import mongoose from "mongoose";
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
couponSchema.virtual("isExpired").get(function(){
  return this.endDate < Date.now();
})
couponSchema.virtual("dayLeft").get(function(){
  return Math.ceil((this.endDate - Date.now())/(1000 * 60 * 60 * 24)) + " days left";
})
// validation
couponSchema.pre("validate",function(next){
  if(this.endDate < this.startDate) next(new Error("end date must be before start date"));
  next();
})
couponSchema.pre("validate",function(next){
  if(this.discount <=0 || this.discount >100) next(new Error("Discount must be between 0 and 100"));
  next();
})

couponSchema.pre("validate",function(next){
  if( this.startDate < Date.now()) next(new Error("start date can't be less than today"));
  next();
})

const Coupon = new mongoose.model("Coupon", couponSchema);
export default Coupon;
