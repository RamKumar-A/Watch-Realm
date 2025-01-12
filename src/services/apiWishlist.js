import { url } from './api';

export async function getWishlist() {
  try {
    const token = localStorage.getItem('token');
    const { data } = await url.get(`/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createWishlistItem(watchId) {
  try {
    const token = localStorage.getItem('token');
    const { data } = await url.post(
      `/wishlist`,
      {
        watchId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function deleteWishlistItem({ itemId }) {
  try {
    const token = localStorage.getItem('token');
    const { data } = await url.delete(`/wishlist/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
