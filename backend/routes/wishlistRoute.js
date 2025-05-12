import express from 'express';
import {
  getWishlist,
  createWishlistItems,
  removerWishlistItems,
} from '../controller/wishlistController.js';
import { protect } from '../controller/authController.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getWishlist).post(createWishlistItems);
router.delete('/:itemId', removerWishlistItems);

export default router;
