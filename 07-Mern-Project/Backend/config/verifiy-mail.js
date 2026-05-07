import fs from "node:fs";
import path from "node:path";
import handlebars from "handlebars";
import nodemailer from "nodemailer";

export const verifiymail = async (token, email) => {

    const filepath = path.join(import.meta.dirname, "template.hbs");
    const emailTemplateSource = fs.readFileSync(filepath, "utf-8")

    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({ token: encodeURIComponent(token) });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Verify your email",
            html: htmlToSend,
        });
        console.log("Verification email sent successfully");
    } catch (error) {

        console.log("Error sending email: ", error);
    }
}

