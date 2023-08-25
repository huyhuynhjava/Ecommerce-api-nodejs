import mongoose from "mongoose";
const dbConnection = async()=>{
    try {
        const conection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb connected on ${conection.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}
export default dbConnection;