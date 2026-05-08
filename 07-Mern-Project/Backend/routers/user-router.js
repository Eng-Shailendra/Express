import { Router } from "express";
import * as controller from "../controllers/user-controllers.js";
import { isAuthentication } from "../middleware/auth-middleware.js";

const router = Router();


router.post("/register", controller.RegisterUser);
router.post("/verify-email", controller.emailVerification);
router.post("/login", controller.LoginUser);
router.post("/forgot-password", controller.forgotPassword)
router.post("/verify-otp/:email", controller.verifiyOtp);
router.post("/confirm-password/:email", controller.updatePassword)

router.post("/logout", isAuthentication, controller.logout)

export default router;