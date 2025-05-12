import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import connectCloudinary from './utils/cloudinary.js';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connected Successfully!');
  })
  .catch((err) => {
    console.log('Connection error', err);
  });

connectCloudinary();

const server = app.listen(port, () => {
  console.log('Listening on port 8000');
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});

// xXOfbUhyUGn65XGC
