import { api } from './api';

export async function createReview({ watchId, review, rating }) {
  try {
    // console.log(watchId, review, rating);
    const { data } = await api.post(`watches/${watchId}/reviews`, {
      review,
      rating,
    });
    return data?.data;
  } catch (error) {
    console.error(error.message);
  }
}
