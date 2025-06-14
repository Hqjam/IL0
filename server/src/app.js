import express from 'express';
import cors from 'cors';
import cookiParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
credentials: true
}));
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({}));
app.use(express.static('public'));
app.use(cookiParser());


export {app}