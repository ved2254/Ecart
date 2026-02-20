import nodemailer from 'nodemailer'
import 'dotenv/config'

export const sendOTPMail = async (otp, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: `<p>Your OTP for password reset is: <b>${otp}</b>. It is valid for 10 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        console.log("OTP sent successfully");

    } catch (error) {
        console.log("OTP Email error:", error.message);
    }
};
