import expess from "express";
import fs from "node:fs";
import mongodb from "mongodb";


async function connectdb() {
    let client = await mongodb.MongoClient.connect("mongodb://localhost:27017");
    let database = client.db("TASK1");
    let collection = await database.createCollection("USERS");
    return collection;
}


const app = expess()
const PORT = 9000;

//middle ware
app.use(expess.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    let src = fs.createReadStream("./index.html", "utf-8");
    src.pipe(res);
});

app.post("/submit", async (req, res) => {
    let { username, email, password } = (req.body);
    
    try {
        let collection = await connectdb();
        collection.insertOne({ username, email, password });
        res.json({ message: "user created" });
    } catch (err) {
        console.log(err);
        res.json({ message: "Unable to create user" });
    }
})


app.get("/all", async (req, res) => {
    try {
        let collection = await connectdb();
        let user = await collection.find({}).toArray();
        res.json({ data: user });
    } catch (err) {
        console.log(err);
        res.json({ message: "Unable to get all user" })
    }
})

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server start on port 9000");
})
