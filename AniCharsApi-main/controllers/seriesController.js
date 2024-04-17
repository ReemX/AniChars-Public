const Series = require("../models/seriesModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { getOne, getAll, fetchAndCreateSeries } = require("./handlerFactory");

// middleware for checking and caching series when necceccary
exports.cachedSeries = catchAsync(async (req, res, next) => {
  // checking if series already exists in DB
  const cachedSeries = await Series.findOne({ mal_id: req.params.malId });

  // if it is then simply attach the ID of the DB series to the next function
  if (cachedSeries) {
    req.params.id = cachedSeries._id;
    return next();
  }

  // if no series is found we use the mal ID in order to fetch it from the jikan api and create it in the database
  const seriesData = await fetchAndCreateSeries(req.params.malId, Series);

  if (!seriesData)
    return next(new AppError("No series found with that ID", 404));

  req.params.id = seriesData._id;
  next();
});

exports.getSeries = getOne(Series);
exports.getAllSeries = getAll(Series);
