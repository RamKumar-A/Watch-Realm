import { createSlice } from '@reduxjs/toolkit';

const persistedWishlist = localStorage.getItem('wishlist');

const initialState = {
  wishlist: persistedWishlist ? JSON.parse(persistedWishlist) : [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addList(state, action) {
      state.wishlist.push(action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    deleteList(state, action) {
      state.wishlist = state.wishlist.filter(
        (list) => list.id !== action.payload
      );
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    clearList(state) {
      state.wishlist = [];
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
  },
});

export const { addList, deleteList, clearList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
