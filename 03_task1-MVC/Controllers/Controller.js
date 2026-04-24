import fs, { createReadStream } from "node:fs";
import path from "node:path";
import { connectDB } from "../Config/Database/Database.js";


export function getHTMLpage(req, res) {
    // let src = fs.createReadStream("../Pages/index.html", "utf-8") //? get error on path so user path module
    let filepath = path.join(import.meta.dirname, "..", "Pages", "index.html");
    let src = fs.createReadStream(filepath, "utf-8");
    src.pipe(res)
}

export async function handleFormSubmit(req, res) {
    let { username, email, password } = req.body;
    let collection = await connectDB();
    let data = await collection.insertOne({ username, email, password });
    res.json({ message: "user created" });
}

export async function handleGetAllUsers(req, res) {
    let collection = await connectDB();
    let data = await collection.find({});
    res.send(data);
}