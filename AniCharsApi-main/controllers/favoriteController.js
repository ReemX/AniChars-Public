const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

// general function for add and removing favorite characters/series
const updateFavorites = async (
  req,
  res,
  next,
  favoritesField,
  isAddOperation,
) => {
  const updateField = `favorite${favoritesField}`;

  const updateOperation = isAddOperation ? "$addToSet" : "$pull";

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      [updateOperation]: { [updateField]: req.params.id },
    },
    { new: true },
  );

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
};

// functions that user "updateFavorites" to update user favorites accordinaly
exports.addFavCharacter = catchAsync(async (req, res, next) => {
  await updateFavorites(req, res, next, "Characters", true); // true for adding
});

exports.addFavSeries = catchAsync(async (req, res, next) => {
  await updateFavorites(req, res, next, "Series", true); // true for adding
});

exports.removeFavCharacter = catchAsync(async (req, res, next) => {
  await updateFavorites(req, res, next, "Characters", false); // false for removing
});

exports.removeFavSeries = catchAsync(async (req, res, next) => {
  await updateFavorites(req, res, next, "Series", false); // false for removing
});
