class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  async filter(brand) {
    const queryObj = { ...this.queryString };
    // console.log(this.queryString);
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    excludedFields.forEach((field) => delete queryObj[field]);
    if (queryObj.brand) {
      const brandName = queryObj.brand;
      const findBrand = await brand.find({ brand: brandName });
      const brandIds = findBrand?.map((brand) => brand._id);
      queryObj.brand = findBrand ? brandIds : undefined;
    }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replaceAll(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`
    );
    if (JSON.parse(queryStr).search) {
      this.query = this.query.find({
        name: { $regex: JSON.parse(queryStr).search, $options: 'i' },
      });
    } else {
      this.query = this.query.find(JSON.parse(queryStr));
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    // else {
    //   this.query=this.query.sort('-createdAt') can't do this because createdAt select set to false
    // }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields
        .split(',')
        .join(' ')
        .replaceAll('password', '');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //excluding the field
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  // search() {
  //   if (this.queryString.search) {
  //     const searchTerm = this.queryString.search;

  //     this.query = this.query.find({
  //       name: { $regex: searchTerm, $options: 'i' },
  //     });
  //   }
  //   return this;
  // }
}

export default APIFeatures;

// search() {
//   if (this.queryString.search) {
//     const searchTerm = this.queryString.search;
//     this.query = this.query.find({ $text: { $search: searchTerm } });
//   }
//   return this;
// }
