import express from 'express';
import {
  getAllOrders,
  getCheckoutSession,
  getOrders,
  getUserOrder,
  createOrder,
} from '../controller/orderController.js';
import { protect, restrictTo } from '../controller/authController.js';

const router = express.Router();

router.use(protect);

router.post('/checkout-session', getCheckoutSession);
router.get('/:userId', getUserOrder);
router.get('/order/:orderId', getOrders);
router.post('/session', createOrder);
// router.get('/my-orders');

router.use(restrictTo('admin'));
router.get('/', getAllOrders);

export default router;
