import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();


export const verifyEmail = async (token,email) =>{

    try {
        const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
});

        
        const mailConfigurations = {
            from : process.env.MAIL_USER,
            to : email,
            subject : 'Email Verification',
            text: `Follow thw link http://localhost:5173/verify/${token}`
        };

         const info = await transporter.sendMail(mailConfigurations);

        console.log("Email sent successfully");
        console.log(info.response);


    } catch (error) {
        console.log("Email error:", error.message);
    }

}


