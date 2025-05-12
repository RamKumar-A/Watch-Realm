import mongoose from 'mongoose';
import slugify from 'slugify';

const watchSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Name of the Watch is required'],
      unique: true,
    },
    slug: String,
    size: {
      type: String,
      required: [true, 'Watch size is required'],
    },
    tag: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Price of the Watch is required'],
    },
    imageCover: {
      type: String,
      required: [true, 'Cover image of the watch is required'],
    },
    images: [String],
    material: {
      type: String,
      lowercase: true,
      required: [true, 'Material of the watch is required'],
    },
    model: {
      type: String,
      required: [true, 'Model of the watch is required'],
    },
    dialColor: {
      type: String,
      lowercase: true,
    },
    waterResistance: {
      type: String,
    },
    features: {
      type: [String],
      required: [true, 'Features of the watch are required'],
    },
    movement: [
      {
        subheading: { type: String },
        value: { type: String },
      },
    ],
    case: [
      {
        subheading: { type: String },
        value: { type: String },
      },
    ],
    strap: [
      {
        subheading: { type: String },
        value: { type: String },
      },
    ],
    dial: [
      {
        subheading: { type: String },
        value: { type: String },
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must above 1.0'],
      max: [5, 'Ratings must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 10,
      validate: {
        validator: function (val) {
          // return this.price * (val / 100) <= this.price;
          return val <= 100;
        },
        message: 'Discount Price {{VALUE}} should be below than 100%',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    category: {
      type: String,
      lowercase: true,
      required: [true, 'Watch must belong to any one category'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

watchSchema.index({ price: 1, ratingsAverage: -1 });
watchSchema.index({ slug: 1 });
watchSchema.index({ name: 'text' });

watchSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// virtual populate
watchSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'watch',
  localField: '_id',
});

// watchSchema.pre(/^find/, function (next) {
//   this.populate({ path: 'brand', select: 'brand' });
//   next();
// });

const Watch = mongoose.model('Watch', watchSchema);

export default Watch;
