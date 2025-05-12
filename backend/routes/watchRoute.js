import express from 'express';
import {
  getAllWatches,
  getCategory,
  getMaterial,
  getSizes,
  getWatch,
  createWatch,
  updateWatch,
  uploadWatchImages,
  resizeWatchImages,
  deleteWatch,
} from '../controller/watchController.js';
import { protect, restrictTo } from '../controller/authController.js';
import reviewRouter from './reviewRoute.js';

const router = express.Router();

router.use('/:watchId/reviews', reviewRouter);

router.get('/', getAllWatches);

router.get('/category', getCategory);
router.get('/material', getMaterial);
router.get('/size', getSizes);

router.get('/:id', getWatch);

router.use(protect, restrictTo('admin'));

router.post('/', createWatch);

router
  .route('/:id')
  .patch(uploadWatchImages, resizeWatchImages, updateWatch)
  .delete(deleteWatch);

export default router;
