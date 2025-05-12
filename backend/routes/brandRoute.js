import express from 'express';
import {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  uploadBrandLogo,
  resizeBrandLogo,
  deleteBrand,
} from '../controller/brandController.js';
import { protect, restrictTo } from '../controller/authController.js';

const router = express.Router();

router.get('/', getAllBrands);
router.get('/:id', getBrand);

router.use(protect, restrictTo('admin'));

router.post('/', createBrand);
router
  .route('/:id')
  .patch(uploadBrandLogo, resizeBrandLogo, updateBrand)
  .delete(deleteBrand);

export default router;
