import mongoose from "mongoose";
async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("databse connected seccessfully")
    } catch (error) {
        console.log("Unable to connect databse", error);
        process.exit(1)
    }
};

export default connectDB;