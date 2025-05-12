import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import xss from 'xss-clean';
import helmet from 'helmet';

import brandRouter from './routes/brandRoute.js';
import watchRouter from './routes/watchRoute.js';
import userRouter from './routes/userRoute.js';
import reviewRouter from './routes/reviewRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import wishlistRouter from './routes/wishlistRoute.js';

import AppError from './utils/appError.js';
import globalErrorHandler from './controller/errorController.js';

import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
      res.set('Access-Control-Allow-Origin', '*');
    },
  })
);
// const corsOptions = (req, callback) => {
//   const origin = req.headers.origin;

//   if (origin) {
//     callback(null, {
//       origin: true, // Allow the request from this origin
//       credentials: true,
//     });
//   } else {
//     callback(new Error('Not allowed by CORS'));
//   }
// };

// app.use(cors(corsOptions));

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());

app.use(compression());

app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/watches', watchRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/wishlist', wishlistRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
