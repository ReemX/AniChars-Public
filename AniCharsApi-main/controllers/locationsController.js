const Location = require("../models/locationModel");
const catchAsync = require("../utils/catchAsync");
const { getAll } = require("./handlerFactory");

exports.getAllLocations = getAll(Location);

exports.getDistribution = catchAsync(async (req, res) => {
  const distribution = await Location.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "location",
        as: "users",
      },
    },
    {
      $unwind: "$users",
    },
    {
      $group: {
        _id: {
          country: "$country",
          lat: "$coordinates.lat",
          lng: "$coordinates.lng",
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        country: "$_id.country",
        count: 1,
        latLng: ["$_id.lat", "$_id.lng"],
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: distribution,
  });
});
