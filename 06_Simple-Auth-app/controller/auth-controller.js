import Users from "../models/user-model.js"
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken"






export async function handelRegester(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({
                seccess: false,
                message: "Missing data ",
            });
        }
        let { username, email, password, role } = req.body;



        if (!username || !email || !password) {
            return res.status(400).json({
                seccess: false,
                message: "All fields are require",
            });
        }
        let existingUser = await (Users.findOne({ email }));
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists",

            });
        }

        //! password hash
        const salt = bcrypt.genSaltSync(10)
        password = (bcrypt.hashSync(password, salt));

        //? creating user
        let newUser = await Users.create({ username, email, password, role });
        if (!newUser) {
            return res.status(400).json({
                seccess: false,
                message: "Unable to create User",
            })
        } else {
            res.status(201).json({
                seccess: true,
                message: "User created seccessfully"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Unable to get data"
        })
    }
}

export async function handelLogin(req, res) {
    try {
        let { email, password } = req.body;
        let User = await Users.findOne({ email });

        if (!User) {
            return (res.status(400).json({
                seccess: true,
                message: "User not found! please regester first ",
            }))
        }
        const salt = bcrypt.genSaltSync(10) // don't have to  add salt 
        password = (bcrypt.hashSync(password, salt));
        let isPasswordMatch = bcrypt.compareSync(password, User.password);
        if (isPasswordMatch) {
            return (res.status(400).json({
                seccess: true,
                message: "invalid password "
            }))
        }

        //! create token -----> accessToken
        const accessToken = jwt.sign({
            id: User._id,
            username: User.username,
            role: User.role
        },
            process.env.JWT_SECRET_KEY, { expiresIn: "1h" },
        )

        res.status(200).json({
            seccess: true,
            message: "login seccessfully",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Unable to login user"
        })
    }
}