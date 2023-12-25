import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
  // wishlist: [
  //   {
  //     id: 1,
  //     name: 'Rolex',
  //     price: 122,
  //     image: 'af',
  //   },
  // ],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addList(state, action) {
      state.wishlist.push(action.payload);
    },
    deleteList(state, action) {
      state.wishlist = state.wishlist.filter(
        (list) => list.id !== action.payload
      );
    },
    clearList(state) {
      state.wishlist = [];
    },
  },
});

export const { addList, deleteList, clearList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
