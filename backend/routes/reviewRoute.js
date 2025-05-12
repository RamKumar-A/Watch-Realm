import express from 'express';
import {
  getAllReviews,
  getReview,
  setWatchUserIds,
  createReview,
  updateReview,
  deleteReview,
} from '../controller/reviewController.js';
import { protect, restrictTo } from '../controller/authController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllReviews).post(setWatchUserIds, createReview);

router.use(restrictTo('admin', 'user'));

router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

export default router;
