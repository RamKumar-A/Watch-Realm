import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [
    {
      watch: {
        type: mongoose.Schema.ObjectId,
        ref: 'Watch',
      },
    },
  ],
});

wishlistSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'items.watch',
    select:
      'imageCover name price ratingsAverage discountPercentage brand slug',
  });
  next();
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
