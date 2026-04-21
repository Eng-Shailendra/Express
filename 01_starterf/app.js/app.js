//  express js is a framework of Node js 

// install express 
// import express
// create server

import express from "express"

const app = express();
const port = 9000;


//! routes 
// app.Method("/path", callback)
app.get("/", (req, res) => {
    res.send({ message: "HOME Page" });
});
app.get("/about", (req, res) => {
    res.send("About Page");
});
app.get("/contact", (req, res) => {
    res.send("contact Page");
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log("server Start at port 9000");

})