import mongoose from "mongoose";
const dbConnection = async()=>{
    try {
        const conection = await mongoose.connect("mongodb://127.0.0.1:27017/nodejs-ecomerce-api");
        console.log(`mongodb connected on ${conection.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}
export default dbConnection;