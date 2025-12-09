import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { connectDB } from './config/database.js';
import bodyParser from 'koa-bodyparser';
import userRoutes from './api/user.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
app.use(cors());
app.use(logger());
app.use(bodyParser());

// Connect to MongoDB
await connectDB();

// Register Routes
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
