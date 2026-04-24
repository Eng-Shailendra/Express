import express from "express";
import routes from "./Routes/routes.js";
// Mongodb connection

const app = express();
const PORT = 9000;


//! middleware 
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//! routes middleware
app.use("/v1/api", routes);



app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server started on port 9000");
})