import { url } from './api';

export async function createReview({ watchId, review, rating }) {
  try {
    const token = localStorage.getItem('token');
    // console.log(watchId, review, rating);
    const { data } = await url.post(
      `watches/${watchId}/reviews`,
      {
        review,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data?.data;
  } catch (error) {
    console.error(error.message);
  }
}
