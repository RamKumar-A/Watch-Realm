import { api } from './api';

export async function getCart() {
  const { data } = await api.get(`/cart`);
  return data?.data;
}

export async function createCartItem(watchId) {
  const { data } = await api.post(`/cart`, {
    watchId,
  });
  return data?.data;
}

export async function updateCartItem(itemId, quantity) {
  const { data } = await api.patch(`cart/${itemId}`, {
    quantity,
  });
  return data?.data;
}

export async function deleteCartItem(itemId) {
  const { data } = await api.delete(`cart/${itemId}`);
  return data?.data;
}
