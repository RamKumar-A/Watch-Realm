import express from 'express';
import {
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  deleteMe,
  deleteUser,
  createUser,
  uploadUserPhoto,
  resizeUserPhoto,
} from '../controller/userController.js';
import {
  signupUser,
  login,
  logout,
  updatePassword,
  restrictTo,
  protect,
} from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', login);
router.get('/logout', logout);

router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);
router.post('/createUser', createUser);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).delete(deleteUser);

export default router;
