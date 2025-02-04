
import express from 'express';
import dotenv from 'dotenv';
import './config/db.js';
import urlRoutes from './routes/urlRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', urlRoutes);




export default app;
