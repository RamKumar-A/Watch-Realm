import { api } from './api';

export async function getWishlist() {
  try {
    const { data } = await api.get(`/wishlist`);
    return data?.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createWishlistItem(watchId) {
  try {
    const { data } = await api.post(`/wishlist`, {
      watchId,
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function deleteWishlistItem({ itemId }) {
  try {
    const { data } = await api.delete(`/wishlist/${itemId}`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
