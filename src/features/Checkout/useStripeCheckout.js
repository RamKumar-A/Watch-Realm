import { useMutation } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';

import { getStripeCheckout } from '../../services/apiOrders';

const stripePromise = loadStripe(
  'pk_test_51Q6Z9jKPOEBjE6FtmqHTlRZ554iWbAiBpPvRpoBJ6IOf7CgeR6M0vOcEsND38F37zW3AuXLq7yrbm5Kqhbug2Azr00H51SKqsX'
);

export function useStripeCheckout() {
  const {
    mutate: createStripeSession,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ items }) => getStripeCheckout({ items }),
    onSuccess: async (data) => {
      if (!data?.session) {
        console.error('Invalid session data:', data);
        return null;
      }
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Stripe failed to initialize.');
        return null;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.session.id,
      });
      if (error) {
        console.error('Error redirecting to Stripe Checkout:', error);
      }
    },
    onError: (error) => {
      console.error('Error creating Stripe session:', error);
    },
  });

  return { createStripeSession, isPending, isError };
}
