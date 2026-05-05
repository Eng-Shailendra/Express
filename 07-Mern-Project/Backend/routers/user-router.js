import { Router } from "express";
import * as controller from "../controllers/user-controllers.js";

const router = Router();


router.post("/register", controller.RegisterUser);
router.post("/login", controller.LoginUser);

export default router;