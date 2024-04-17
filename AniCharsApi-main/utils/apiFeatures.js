class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // BUILD QUERY
    let queryObj = { ...this.queryString };

    // FILTERING
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // turn to string
    queryObj = JSON.stringify(queryObj);
    // placing $ behind each operation
    queryObj = queryObj.replace(
      /\b(gte|gt|lte|lt|regex)\b/g,
      (match) => `$${match}`,
    );

    queryObj = JSON.parse(queryObj);

    if (queryObj?.name?.$regex)
      queryObj.name.$regex = new RegExp(queryObj.name.$regex, "i");

    // parsing back to object
    this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt _id");
    }

    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  page() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    this.qq = this.query;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
