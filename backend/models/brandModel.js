import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'name is required'],
      unique: true,
      lowercase: true,
    },
    tag: String,
    description: String,
    brandLogo: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
