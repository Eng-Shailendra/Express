import { Router } from "express";
import { get } from "mongoose";
import { authMiddleware } from "../middleware/auth-middleware.js"

const router = Router();


router.get("/home", authMiddleware, (req, res) => {
    let { username, role } = req.userInfo;
    res.status(200).json({
        success: true,
        message: "Wellcome home page",
        data: {
            username,
            role,
        }
    })
})

export default router;