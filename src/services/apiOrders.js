import { url } from './api';

export async function getUserOrders(userId) {
  const storedToken = localStorage.getItem('token');
  try {
    const { data } = await url.get(`/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return data?.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getOrder(orderId) {
  const storedToken = localStorage.getItem('token');
  try {
    const { data } = await url.get(`/orders/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return data?.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getStripeCheckout({ items }) {
  try {
    // Fetch the checkout session from the backend
    const storedToken = localStorage.getItem('token');

    const { data } = await url.post(
      '/orders/checkout-session',
      {
        orderItems: items,
      },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    return data;
  } catch (err) {
    console.error('Error during checkout:', err);
  }
}

export async function createOrder(sessionId) {
  const storedToken = localStorage.getItem('token');

  try {
    const data = await url.post(
      `/orders/session`,
      {
        sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    return data.data;
  } catch (err) {
    console.error(err.message);
  }
}
