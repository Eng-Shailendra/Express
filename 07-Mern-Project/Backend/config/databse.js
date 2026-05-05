import mongoose from "mongoose";

export async function connectDB(params) {
    try {
        let db = await mongoose.connect(process.env.DATABASE_URL);  
        console.log("database connected seccesfully");
        return db;
    }
    catch (err) {
        console.log(err);
    }
}
