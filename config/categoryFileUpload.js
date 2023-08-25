import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import cloudinaryPackage from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary"
const cloudinary = cloudinaryPackage.v2;

// configure cloudinary
cloudinary.config({
    cloud_name :process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY,
})

//create storage engine for multer
// to save file recive from multer to cloudinary
const storage = new  CloudinaryStorage({
    cloudinary,
    allowedFormats :["jpg","png","jpeg"],
    params : {
        folder : "Ecommerce-api"
    }
})
// init multer witg storage engine
//to recive file
const uploadCategory = multer({
    storage
});

export default uploadCategory;