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

        //! Email verification
        verifiymail(token, email);
        user.token = token;
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully cheack email for verification",
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    };
}


export const emailVerification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
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
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email ",
            })
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect",
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User not verified. Please Register first, check your email for verification",
            })
        }

        const existingSession = await Session.findOne({ userId: user._id });
        if (existingSession) {
            await Session.deleteOne({ userId: user._id });
        }
        await Session.create({ userId: user._id });

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });

        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        user.isLogin = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: `Wellcome back user ${user.username}`,
            accessToken,
            refreshToken,
            user: {
                username: user.username
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


//! Logout
export const logout = async (req, res) => {
    try {
        const userId = req.userId  // userId will come from -> authMiddleware
        const sessionPromise = await Session.deleteMany({ userId })
        const userProminse = await User.findByIdAndUpdate(userId, { isLogin: false });

        Promise.allSettled([userProminse, sessionPromise]).then(
            (data) => {
                console.log(data);
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

        user.otp = otp;
        user.otpExpires = expiry;
        await user.save();

        await sendOtpMail(email, otp);
        return res.status(200).json({
            success: true,
            message: `OTP sent successfully ${email}`
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Somethig went wrong"
        })

    }
}


export const verifiyOtp = async (req, res) => {
    try {
        const { otp } = req.body
        const email = req.params.email;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "OTP is not found"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({
                success: false,
                message: "Otp not generated or already verified"
            })
        }
        if (user.otpExpires < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Otp has expire, Please request new otp"
            });
        }

        if (otp !== user.otp) {
            return res.status(400).json({
                success: false,
                message: "Enter valid otp"
            });
        }
        user.otp = null;
        user.otpExpiry = null
        await user.save();
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }

}



//! Change password

export const updatePassword = async (req, res) => {
    try {
        const { newpassword, conformpassword } = req.body;
        const email = req.params.email;

        if (!newpassword || !conformpassword) {
            return res.status(400).json({
                success: false,
                message: "All fileds are requrired"
            })
        }

        if (newpassword !== conformpassword) {
            return res.status(400).json({
                success: false,
                message: "Password miss match"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Password miss match"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password change successfully",
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}