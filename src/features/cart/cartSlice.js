import { createSlice } from '@reduxjs/toolkit';

const persistedCart = localStorage.getItem('cart');

const initialState = {
  cart: persistedCart ? JSON.parse(persistedCart) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.price_range;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.price_range;
      if (item.totalPrice === 0)
        cartSlice.caseReducers.deleteItem(state, action);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    clearCart(state) {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export default cartSlice.reducer;
