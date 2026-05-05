import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    usename: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: [true, "Email should be unique"]
    },
    password: {
        type: String,
        require: true,
        minLength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },


}, { timestamps: true });

export default mongoose.model("User", userschema);