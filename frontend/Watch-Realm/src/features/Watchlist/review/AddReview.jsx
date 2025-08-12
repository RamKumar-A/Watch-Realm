import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, useInView } from 'framer-motion';
import toast from 'react-hot-toast';

import { useCreateReview } from './useCreateReview';
import { useUser } from '../../User/useUser';

import { childVariants, parentVariants } from '../../../helpers/variants';

import SuccessToast from '../../../ui/SuccessToast';
import ErrorToast from '../../../ui/ErrorToast';
import Dialog from '../../../ui/Dialog';
import Rating from '../../../ui/Rating';
import Button from '../../../ui/Button';

function AddReview({ reviews, watchId }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user, isAuthenticated } = useUser();
  const { createReview } = useCreateReview();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const isInReview = reviews?.some(
    (review) => review?.user?._id === user?.data?._id
  );

  function onSubmit(data) {
    const reviewData = { ...data, rating, watchId };
    createReview(reviewData, {
      onSuccess: () => {
        toast.success((t) => (
          <SuccessToast t={t}>Your review Added</SuccessToast>
        ));
        setDialogOpen(false);
      },
      onError: () => {
        toast.error((t) => (
          <ErrorToast t={t}>Error while adding review</ErrorToast>
        ));
      },
    });
    reset();
  }

  return (
    <>
      <div
        className="text-center space-y-5 py-5 border border-highlight-light rounded-lg"
        ref={ref}
      >
        <motion.div
          className="space-y-3"
          variants={parentVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h3 className="text-2xl font-bold " variants={childVariants}>
            Have feedback for this product?
          </motion.h3>
          <motion.p className=" text-lg" variants={childVariants}>
            Your review helps us deliver an even more royal experience.
          </motion.p>
        </motion.div>
        <Button
          variant="primary"
          rounded="small"
          size="medium"
          onClick={() => setDialogOpen(true)}
          disabled={isInReview || !isAuthenticated}
        >
          {!isAuthenticated
            ? 'Login Please'
            : isInReview
            ? 'Review Added'
            : 'Write a Review'}
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        title="Write Your Review"
        onClose={() => setDialogOpen(false)}
      >
        <form className="space-y-5 p-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="text-xl font-semibold pb-2">Rate this watch</h3>
            <Rating
              value={rating}
              onChange={(newRating) => setRating(newRating)}
            />
          </div>
          <div className="space-y-5">
            <label htmlFor="review" className="block text-xl font-semibold">
              Review
            </label>
            <textarea
              id="review"
              rows="4"
              name="review"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-accent-primary focus:border-accent-primary"
              placeholder="Write your review here..."
              {...register('review', {
                required: 'review is required',
              })}
            ></textarea>
            {errors.review && (
              <p className="text-red-500 text-xs">{errors.review.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setDialogOpen(false)}
              className=""
            >
              Cancel
            </Button>

            <Button variant="primary" className="" type="submit">
              Submit Review
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default AddReview;
