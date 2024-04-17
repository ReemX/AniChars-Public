const Rating = require("../models/ratingModel");
const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");

exports.getAllRatings = getAll(Rating);
exports.getRating = getOne(Rating);
exports.createRating = createOne(Rating);
exports.deleteRating = deleteOne(Rating);
exports.updateRating = updateOne(Rating);
