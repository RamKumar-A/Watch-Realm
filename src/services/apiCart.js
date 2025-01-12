import { url } from './api';

export async function getCart() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please log in.');
  }
  const { data } = await url.get(`/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data?.data;
}

export async function createCartItem(watchId) {
  const token = localStorage.getItem('token');

  const { data } = await url.post(
    `/cart`,
    {
      watchId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data?.data;
}

export async function updateCartItem(itemId, quantity) {
  const token = localStorage.getItem('token');
  const { data } = await url.patch(
    `cart/${itemId}`,
    {
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data?.data;
}

export async function deleteCartItem(itemId) {
  const token = localStorage.getItem('token');

  const { data } = await url.delete(`cart/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data?.data;
}
