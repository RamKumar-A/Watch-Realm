import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      watch: {
        type: mongoose.Schema.ObjectId,
        ref: 'Watch',
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to user'],
  },
  totalAmount: { type: Number, required: true },
  address: { type: Object, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Placed',
  },
  receiptUrl: {
    type: String,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'orderItems.watch',
    // select: 'name imageCover price',
  });
  this.populate({ path: 'user', select: 'name email' });

  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

// const orderItemSchema = new mongoose.Schema({
//   paymentData: {
//     type: Object,
//   },
//   watch: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Watch',
//     required: true,
//   },
//   quantity: { type: Number, required: true, default: 1 },
// });
