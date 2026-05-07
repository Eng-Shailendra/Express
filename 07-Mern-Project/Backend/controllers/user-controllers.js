import User from "../Model.js/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifiymail } from "../config/verifiy-mail.js";
import { Session } from "../Model.js/sesson-model.js";
import { sendOtpMail } from "../config/otp-mail.js";

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
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        //! Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
        user.token = token;
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

        // Email verification
        verifiymail(token, email);
        user.token = token;
        await user.save();

        // Cheack user is verify or not
        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User not verified cheeck email for verification ✔"
            });
        }

        const existingSession = await Session.findOne({ UserId: user._id });
        if (existingSession) {
            await Session.deleteOne({ UserId: user._id });
        }

        // ! create new session 
        const session = await Session.create({ UserId: user._id })

        //! create access token 
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        })


        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        })

        user.isLogin = true;
        await user.save();

        // return res.status(200).json({
        //     success: true,
        //     message: `Wellcome back ${username}`
        // });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    };

}


export const emailVerification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(400).json({
                success: false,
                message: "Token is missing"
            })
        }

        const token = authHeader.split(" ")[1]
        let decodedInfo
        try {
            decodedInfo = jwt.verify(token, process.env.JWT_SECRET)

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Token expired",
            });
        }
        const user = await User.findById(decodedInfo.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not found"
            })
        }
        user.isVerified = true;
        user.token = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Somethig wrong"
        });
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


//! Logout
export const logout = async (req, res) => {
    try {
        const userId = req.userId
        const sessionPromise = await Session.deleteMany({ userId })
        const userProminse = await user.findByIdAndUpdate(userId, { isLogin: false });

        promises.allSetteld([userProminse, sessionPromise]).then(
            () => {
                return res.status(200).json({
                    success: true,
                    message: "Logged out successfully ",
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Somethig went wrong"
        })
    }
}

//! Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Somethig went wrong"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp
        user.otpExpiry = expiry
        await user.save();

        await sendOtpMail(email, otp);
        return res.status(200).json({
            success: true,
            message: `OTP sent successfully ${email}`
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Somethig went wrong"
        })

    }
}