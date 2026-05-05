import dotenv from "dotenv";
dotenv.config({ quiet: true })
import express from "express";
import authRoutes from "./routes/auth-routes.js";
import connectDB from "./Config/databse.js";
import homeRoute from "./routes/home-routes.js"

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use("/v1/api", authRoutes);
app.use("/v1/api", homeRoute);

//! DATA base connection
connectDB();

//! sever start
app.listen(port, (err) => {
    if (err)
        console.log(err);
    console.log("Server start on port 90000");
})