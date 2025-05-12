import express from 'express';
import {
  getCart,
  createCartItems,
  removerCartItems,
  updateQuantityInCart,
} from '../controller/cartController.js';
import { protect } from '../controller/authController.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getCart).post(createCartItems);
router.route('/:itemId').patch(updateQuantityInCart).delete(removerCartItems);

export default router;
