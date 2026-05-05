import User from "../Model.js/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifiymail } from "../config/verifiy-mail.js";


export async function RegisterUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            });
        }
        const isExisting = await User.findOne({ email });
        if (isExisting) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        //! Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        await newUser.save();

        //! Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser,
        });

        // todo Email verification
        verifiymail(token, email);
        newUser.token = token;
        newUser.token = token;
        await newUser.save();

        //todo ---> cheack user is verify or not



    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
        console.log(err);
    }

}


export async function LoginUser(req, res) {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}