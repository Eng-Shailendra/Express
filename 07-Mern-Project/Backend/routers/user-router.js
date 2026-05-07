import { Router } from "express";
import * as controller from "../controllers/user-controllers.js";

const router = Router();


router.post("/register", controller.RegisterUser);
router.post("/verify-email", controller.emailVerification);
router.post("/login", controller.LoginUser);
router.post("/forgot-password", controller.forgotPassword)
export default router;