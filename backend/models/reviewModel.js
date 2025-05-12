import mongoose from 'mongoose';
import Watch from './watchModel.js';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review must not to be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    watch: {
      type: mongoose.Schema.ObjectId,
      ref: 'Watch',
      required: [true, 'Review must belong to a product!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must be written by a user!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ watch: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.statics.averageRating = async function (watchId) {
  const stats = await this.aggregate([
    {
      $match: { watch: watchId },
    },
    {
      $group: {
        _id: '$watch',
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Watch.findByIdAndUpdate(watchId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].numRating,
    });
  } else {
    await Watch.findByIdAndUpdate(watchId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', async function (next) {
  await this.constructor.averageRating(this.watch);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.averageRating(this.r.watch);
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
