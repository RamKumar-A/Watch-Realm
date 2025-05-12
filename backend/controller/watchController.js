import multer from 'multer';
import cloudinary from 'cloudinary';
import Brand from '../models/brandModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';
import Watch from './../models/watchModel.js';

// const multerStorage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

export const uploadWatchImages = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 3,
  },
]);

export const resizeWatchImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  // Initialize arrays to store Cloudinary upload results
  req.body.images = [];

  if (req.files.imageCover) {
    // 1) Handle Cover Image Upload with Transformation
    // const base64Image = `data:${
    //   req.file.mimetype
    // };base64,${req.file.buffer.toString('base64')}`;
    const coverResult = await cloudinary.v2.uploader.upload(
      req.files?.imageCover?.[0]?.path,
      {
        folder: 'watch-realm-watches',
        transformation: [
          {
            quality: 'auto',
            fetch_format: 'auto',
          },
          {
            width: 1200,
            crop: 'fill',
            gravity: 'auto',
          },
        ],
      }
    );

    req.body.imageCover = coverResult.secure_url;
  }

  if (req.files.images) {
    // 2) Handle Other Images Upload with Transformation
    await Promise.all(
      req.files.images?.map(async (file, i) => {
        const imageResult = await cloudinary.uploader.upload(file?.path, {
          folder: 'watch-realm-watches',
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto',
            },
            {
              width: 1200,
              crop: 'fill',
              gravity: 'auto',
            },
          ],
        });
        req.body.images.push(imageResult.secure_url);
      })
    );
    // console.log(req.body.images);
  }

  next();
});

export const getMaterial = catchAsync(async (req, res, next) => {
  const material = await Watch.aggregate([
    {
      $group: {
        _id: '$material',
      },
    },
    {
      $project: {
        _id: 0,
        material: '$_id',
      },
    },
    {
      $sort: { material: 1 },
    },
  ]);

  const materialsArray = material?.map((mtrl, i) => ({
    _id: i + 1,
    material: mtrl.material,
  }));
  res.status(200).json({
    status: 'success',
    data: materialsArray,
  });
});

export const getCategory = catchAsync(async (req, res, next) => {
  const categories = await Watch.aggregate([
    {
      $group: {
        _id: '$category',
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
      },
    },
    {
      $sort: {
        category: 1,
      },
    },
  ]);
  const categoryArr = categories.map((cat, i) => ({
    _id: i + 1,
    category: cat.category,
  }));
  res.status(200).json({
    status: 'success',
    data: categoryArr,
  });
});

export const getSizes = catchAsync(async (req, res, next) => {
  const sizes = await Watch.aggregate([
    {
      $group: {
        _id: '$size',
      },
    },
    {
      $project: {
        _id: '$size',
        size: '$_id',
      },
    },
    {
      $sort: {
        size: 1,
      },
    },
  ]);
  const sizesArray = sizes?.map((s, i) => ({ _id: i + 1, size: s.size }));

  res.status(200).json({
    status: 'success',
    data: sizesArray,
  });
});

export const getAllWatches = catchAsync(async (req, res) => {
  const features = (
    await new APIFeatures(
      Watch.find().populate({
        path: 'brand',
        select: 'brand',
      }),
      req.query
    ).filter(Brand)
  )
    // .search()
    .sort()
    .limitFields()
    .pagination();

  const watches = await features.query;

  const total = await Watch.countDocuments();
  res.status(200).json({
    status: 'success',
    results: watches.length,
    totalResults: total,
    data: watches,
  });
});

export const getWatch = catchAsync(async (req, res) => {
  const watch = await Watch.findById(req.params.id)
    .populate({ path: 'brand' })
    .populate({ path: 'reviews' });
  res.status(200).json({
    status: 'success',
    data: watch,
  });
});

export const createWatch = catchAsync(async (req, res) => {
  try {
    const newWatch = await Watch.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newWatch,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
});

export const updateWatch = catchAsync(async (req, res) => {
  const updatedWatch = await Watch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  await updatedWatch.save();
  res.status(200).json({
    status: 'success',
    data: updatedWatch,
  });
});

export const deleteWatch = catchAsync(async (req, res) => {
  await Watch.findByIdAndDelete(req.params.id, req.body);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Filtering
// const queryObj = { ...req.query };
// const excludedFields = ['sort', 'fields', 'limit', 'page'];
// excludedFields.forEach((field) => delete queryObj[field]);

// if (queryObj.brand) {
//   const brandName = queryObj.brand;
//   const brand = await Brand.findOne({ brand: brandName });
//   queryObj.brand = brand.id;
// }

// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replaceAll(
//   /\b(gte|gt|lte|lt)\b/g,
//   (match) => `$${match}`
// );

// let query = Watch.find(JSON.parse(queryStr)).populate({
//   path: 'brand',
//   select: 'brand',
// });

// // Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   query = query.sort(sortBy);
// } else {
//   // query = query.sort('-createdAt'); // can't do because createdAt select set to false
// }

// // Field limits

// if (req.query.fields) {
//   const fields = req.query.fields
//     .split(',')
//     .join(' ')
//     .replaceAll('password', '');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
// }

// // Pagination

// const page = req.query.page || 1;
// const limit = req.query.limit || 100;
// const skip = (page - 1) * limit;
// query = query.skip(skip).limit(limit);
