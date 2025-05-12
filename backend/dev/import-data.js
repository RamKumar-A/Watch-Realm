import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import Watch from '../models/watchModel.js';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connected Successfully!');
});

const watches = JSON.parse(
  fs.readFileSync(`${__dirname}/watches.json`, 'utf-8')
);
// const brands = JSON.parse(fs.readFileSync(`${__dirname}/brands.json`, 'utf-8'));

async function importData() {
  try {
    await Watch.create(watches);
    // await Brand.create(brands);
    console.log('Data imported to database successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

async function deleteData() {
  try {
    await Watch.deleteMany();
    // await Brand.deleteMany();
    console.log('Data deleted from database successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
