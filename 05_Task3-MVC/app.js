import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import {connectdb} from "./config/database.js"


const app = express();
let PORT = process.env.PORT || 9000;

//! Database  connection 
connectdb()

//! middleware
app.use(express.json());

//! Routes

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("server started at PORT", PORT);
});