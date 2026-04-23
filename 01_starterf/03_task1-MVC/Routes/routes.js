import express from "express";
import { getHTMLpage, handleFormSubmit, handleGetAllUsers } from "../Controllers/Controller.js"

const router = express.Router();

router.get("/", getHTMLpage);

router.post("/submit", handleFormSubmit);

router.all("/all", handleGetAllUsers);

export default router;

