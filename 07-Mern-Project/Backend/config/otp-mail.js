import nodeMailer from "nodemailer"

export const sendOtpMail = async (email, otp) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const mailConfig = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Password reset Otp",
        html: `<p>The OTP for password reset is <b>${otp}</b> only valid for 10 minutes </p>`

    }
    await transporter.sendMail(mailConfig);
}
