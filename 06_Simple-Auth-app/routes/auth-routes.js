import { Router } from "express";
import *as authController from "../controller/auth-controller.js"

const router = Router();

router.post("/register", authController.handelRegester)
router.post("/login", authController.handelLogin)

export default router;