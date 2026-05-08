import jwt from "jsonwebtoken";
import User from "../Model.js/user-model.js";


export const isAuthentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Access token is missing",
            })
        }

        const token = authHeader.split(" ")[1];

        try {
            let decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decodedInfo)
            const { id } = decodedInfo;
            const user = await User.findById(id);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found",
                })
            }
            console.log(user._id)
            req.userId = user._id;
            next()
        } catch (err) {
            if (err.name === "TokenExpairedError") {
                return res.status(400).json({
                    success: false,
                    message: "access Token is exprired have to login againe",
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};