import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import homeRoute from './routes/homeRoute.js';
import companyRoute from './routes/companyRoute.js';
import searchRoute from './routes/searchRoute.js';
import profileRoute from './routes/profileRoute.js';
import {requireSignIn} from './middleware/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/', homeRoute);
app.use('/api', companyRoute);
app.use('/api/profile', profileRoute);
app.use('/api/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok:true});
})

app.listen(8080, () => {
    console.log('Example app listening on port 3000!');
});