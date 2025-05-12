import Cart from '../models/cartModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getCart = catchAsync(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req?.user?._id })
      .populate({
        path: 'items.watch',
        select: 'name price imageCover',
      })
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: {
        data: cart,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
});

export const createCartItems = catchAsync(async (req, res, next) => {
  try {
    const { watchId } = req.body;
    // Find the user's cart
    const cart = await Cart.findOne({ user: req?.user?._id });
    // Check if the item already exists in the cart
    const existingItem = cart?.items?.find(
      (item) => item.watch._id.toString() === watchId
    );
    if (existingItem) {
      // If the item exists, return a conflict response without updating the quantity
      return res.status(409).json({
        status: 'fail',
        message:
          'Item already exists in the cart. Use the update endpoint to modify quantity.',
      });
    } else {
      // Add the new item to the cart
      cart.items?.push({ watch: watchId });
    }
    await cart.save();
    res.status(201).json({
      status: 'success',
      data: {
        data: cart,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
});

export const removerCartItems = catchAsync(async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req?.user?._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    // Remove the item by filtering out the item to delete
    cart.items = cart?.items.filter((item) => item?._id.toString() !== itemId);

    await cart.save();
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

export const updateQuantityInCart = catchAsync(async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req?.user?._id });

    const item = cart.items.find((item) => item._id.toString() === itemId);

    // Update the item's quantity
    if (quantity > 0) {
      item.quantity = quantity;
    } else {
      res.status(400).json({
        status: 'success',
        message: 'Quantity must greater than zero',
      });
    }

    const updatedCart = await cart.save();
    res.status(200).json({ status: 'success', data: { data: updatedCart } });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
});
