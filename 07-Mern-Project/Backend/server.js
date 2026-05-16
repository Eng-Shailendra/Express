import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/databse.js"
import userRouters from "./routers/user-router.js";
import cors from "cors"

const app = express();
const PORT = process.env.PORT;




connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))


//! middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/api", userRouters);




app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    console.log("Server stated successfully 🚀");

})