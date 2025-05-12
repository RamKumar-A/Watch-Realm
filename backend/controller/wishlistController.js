import Wishlist from '../models/wishlistModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getWishlist = catchAsync(async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    res.status(200).json({
      status: 'success',
      data: {
        data: wishlist,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
});

export const createWishlistItems = catchAsync(async (req, res, next) => {
  try {
    const { watchId } = req.body;
    // Find the user's Wishlist
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    // Check if the item already exists in the Wishlist
    const existingItem = wishlist?.items?.find(
      (item) => item.watch._id.toString() === watchId
    );

    if (existingItem) {
      // If the item exists, return a conflict response without updating the quantity
      return res.status(409).json({
        status: 'fail',
        message: 'Item already exists in the Wishlist.',
      });
    } else {
      // Add the new item to the Wishlist
      wishlist.items?.push({ watch: watchId });
    }
    await wishlist.save();
    res.status(201).json({
      status: 'success',
      data: {
        data: wishlist,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
});

export const removerWishlistItems = catchAsync(async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Wishlist not found' });
    }
    // Remove the item by filtering out the item to delete
    wishlist.items = wishlist?.items.filter(
      (item) => item?._id.toString() !== itemId
    );

    await wishlist.save();
    res.status(204).json({
      status: 'success',
      data: {
        data: null,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
});
