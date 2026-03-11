import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected sucessfully   ');
            console.log("Database Name:", mongoose.connection.name);

        
    } catch (error) {
        console.log("MongoDB connection failed",error);
        
        
    }
}

export default connectDB