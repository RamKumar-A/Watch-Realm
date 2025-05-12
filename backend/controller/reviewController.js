import Review from '../models/reviewModel.js';
import catchAsync from '../utils/catchAsync.js';

export const setWatchUserIds = (req, res, next) => {
  if (!req.body.watch) req.body.watch = req.params.watchId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ watch: req.params.watchId });
  res.status(200).json({
    status: 'success',
    data: {
      data: reviews,
    },
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      data: review,
    },
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: newReview,
    },
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: review,
    },
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});
