import express from 'express'
import dotenv from "dotenv";
dotenv.config();

import connectDB from './database/db.js'
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'


const app = express()
const PORT = process.env.PORT ||  3000

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS);


// middleware

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/user',userRoute)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/cart',cartRoute)
app.use('/api/v1/orders', orderRoute)
// http://localhost:8000/api/v1/user/register

app.listen(PORT, ()=> {
    connectDB()
    console.log(`Server is listingf at http://localhost:${PORT} `);
    
})

