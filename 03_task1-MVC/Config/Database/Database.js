import mongodb, { ClientSession } from "mongodb";

async function connectDB() {
    try {
        let client = await mongodb.MongoClient.connect("mongodb://localhost:27017");
        let databse = client.db("TASK1-MVC");
        let collection = await databse.createCollection("user");

        return collection;
    } catch (err) {
        console.log(err);
    }

}

export { connectDB };
