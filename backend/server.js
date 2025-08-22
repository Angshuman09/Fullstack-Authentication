import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import auth from './routers/auth.router.js'
import user from './routers/user.router.js'

const port = process.env.PORT || 4000;

db();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowOrgin=['http://localhost:5173','https://loginwala-angshuman09s-projects.vercel.app','https://loginwala.vercel.app'];
app.use(cors(
    {
        origin:allowOrgin,
        credentials:true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));


//API endpoints
app.get('/',(req,res)=>{
    res.send("work hard");
})

app.use('/api/auth',auth);
app.use('/api/user',user);

app.listen(port , ()=>{
    console.log(`app is listening at port : ${port}`);
})
