import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Only logged in user can have cart'],
  },
  items: [
    {
      watch: {
        type: mongoose.Schema.ObjectId,
        ref: 'Watch',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

cartSchema.pre('save', async function (next) {
  if (this.isModified('items')) {
    await this.populate({
      path: 'items.watch',
      select: 'name price imageCover',
    });

    this.totalPrice = this.items?.reduce((total, item) => {
      return item.quantity * item.watch.price + total;
    }, 0);
  }
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

// const itemSchema = new mongoose.Schema({
//   watch: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Watch',
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     default: 1,
//   },
// });
