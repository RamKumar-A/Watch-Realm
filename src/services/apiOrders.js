import { api } from './api';

export async function getUserOrders(userId) {
  try {
    const { data } = await api.get(`/orders/${userId}`);
    return data?.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getOrder(orderId) {
  try {
    const { data } = await api.get(`/orders/order/${orderId}`);
    return data?.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getStripeCheckout({ items }) {
  try {
    // Fetch the checkout session from the backend

    const { data } = await api.post('/orders/checkout-session', {
      orderItems: items,
    });

    return data;
  } catch (err) {
    console.error('Error during checkout:', err);
  }
}

export async function createOrder(sessionId) {
  try {
    const data = await api.post(`/orders/session`, {
      sessionId,
    });
    return data.data;
  } catch (err) {
    console.error(err.message);
  }
}
