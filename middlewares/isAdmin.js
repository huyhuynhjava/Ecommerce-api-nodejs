import User from "../model/User.js"
import AsyncHandler from "express-async-handler";
const isAdmin = AsyncHandler(
    async( req, res, next ) => {
        // find the login user
        const user = await User.findById(req.userAuthId);
        // check if admin
        if(user.isAdmin) {
            next();
        }else{
            throw new Error("Access denied, Admin only");
        }
    }
) 
export default isAdmin;