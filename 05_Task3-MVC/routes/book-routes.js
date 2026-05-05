import express from "express";
import { handleAllbook, handleDeletebook, handleGetAllBooks, handleGetSingleBook, handleUpdatebook } from "../Controller/book-controller.js"
const router = express.Router();


router.get("/all-book", "handleGetAllBooks");


router.get("/book/:id", "handleGetSingleBook")

router.post("/add-book", "handleAllbook")

router.put("/update-book", "handleUpdatebook")

router.delete("/delete-book/:id", "handleDeletebook")

export default router