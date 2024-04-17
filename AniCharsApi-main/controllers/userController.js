const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { deleteOne, updateOne, getOne, getAll } = require("./handlerFactory");

// helper function for filtering an object based on key names
const filterObj = (obj, ...allowedFields) => {
  const updatedObj = Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedFields.includes(key)),
  );

  return updatedObj;
};

// function for getting the currently logged in user
exports.getCurrentUser = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// function for updating details like username of the current logged in user (more in future)
exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  const filteredObj = filterObj(req.body, "username", "photo");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

// function for deactivating a user who wants to delete his account
exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

// factory handlers
exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
