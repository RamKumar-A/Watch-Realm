import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate({ path: 'user', select: 'name email' })
    .populate({ path: 'orderItems.watch' })
    .sort(-1);
  res.status(200).json({
    status: 'success',
    data: {
      data: orders,
    },
  });
});

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  const { orderItems } = req.body;
  // 1) Get order items
  const transformedItems = orderItems?.map((item) => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.watch.name,
          metadata: {
            productId: item.watch.id,
          },
        },
        unit_amount: item.watch.price * 100,
      },
      quantity: item.quantity,
    };
  });
  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.headers?.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers?.origin}/checkout`,
    customer_email: req?.user?.email,

    line_items: transformedItems,
    mode: 'payment',

    shipping_address_collection: { allowed_countries: ['IN'] },
  });
  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

export const createOrder = catchAsync(async (req, res, next) => {
  const { sessionId } = req.body;

  // 1) Get session
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  // 2) Get order items
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

  const user = await User.findOne({ email: session?.customer_email });
  const orderItems = await Promise.all(
    lineItems.data.map(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);

      return {
        watch: product.metadata.productId,
        quantity: item.quantity,
      };
    })
  );

  // 3) Handle invoice/receipt for one-time payments
  // Getting invoice details - in mode: payment invoice is null for one time payments, so we using paymentIntent and charge to retreive the invoice details (receipt url)
  const paymentIntent = await stripe.paymentIntents.retrieve(
    session?.payment_intent
  );
  const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);

  // 4) Prevent duplicate orders
  const existingOrder = await Order.findOne({ sessionId });
  if (existingOrder) {
    return res.status(200).json({ status: 'success', data: existingOrder });
  }

  // 5) Create order
  const order = await Order.create({
    orderItems,
    user: user?._id,
    totalAmount: session?.amount_total / 100,
    address: session?.shipping_details?.address,
    paid: charge?.paid,
    sessionId: session.id,
    receiptUrl: charge?.receipt_url,
  });

  // 6) Clear cart only if payment is successful
  if (charge?.paid && user?._id) {
    await Cart.findOneAndUpdate(
      { user: user._id },
      { $set: { items: [] } },
      { new: true }
    );
  }

  res.status(201).json({
    status: 'success',
    data: order,
  });
});

export const getUserOrder = catchAsync(async (req, res, next) => {
  const order = await Order.find({ user: req.params.userId })
    .populate({
      path: 'orderItems.watch',
    })
    .sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    data: {
      data: order,
    },
  });
});

export const getOrders = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId).populate({
    path: 'orderItems.watch',
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: order,
    },
  });
});

// export const webhookCheckout = (req, res, next) => {
//   const signature = req.headers['stripe-signature'];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature
//       // process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     createBookingCheckout(event.data.object);
//   }

//   res.status(200).json({ received: true });
// };

// FOR LATER

export const updateOrder = catchAsync(async () => {});

export const deleteOrder = catchAsync(async () => {});
