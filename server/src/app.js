import express from 'express';
import cors from 'cors';
import cookiParser from 'cookie-parser';
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import reviewRoutes from "./routes/review.routes.js";
import businessRoutes from "./routes/business.routes.js"

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

app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/review",reviewRoutes)
app.use("/api/business",businessRoutes)


export {app}