const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Location = require("../models/locationModel");

// function for creating tokens
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// function for sending tokens
const createSendToken = (user, statusCode, res, middle = false) => {
  const token = signToken(user._id);

  const cookieOptions = {
    maxAge: process.env.JWT_EXPIRES_IN_JS * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // attaching the cookie to the response
  res.cookie("jwt", token, cookieOptions);

  // deleting the enctypted password from the response
  user.password = undefined;

  // sending cookie, token and user details to the client

  if (middle) return;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

// function for signing up
exports.signup = catchAsync(async (req, res, next) => {
  const query =
    req.ip === "::ffff:127.0.0.1" || req.ip === "::1"
      ? "46.121.241.27"
      : req.ip;
  const ipReq = await fetch(`http://ip-api.com/json/${query}`);
  const ipData = await ipReq.json();

  let locationDoc = await Location.findOne({ country: ipData.country });

  if (!locationDoc) {
    locationDoc = await Location.create({ country: ipData.country });
  }

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    location: locationDoc._id,
  });

  createSendToken(newUser, 201, res);
});

// function for logging in
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new AppError("Please provide username and password!", 400));

  // finding user by his username
  const user = await User.findOne({ username }).select("+password");

  // checkig if user exists and if the password is correct
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect username or password", 401));

  // if all is good log in the user
  createSendToken(user, 200, res);
});

// function for logging out the user
exports.logout = (req, res) => {
  // renewing the jwt cookie the user has with a new invalid one

  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: "none",
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", "loggedout", cookieOptions);
  res.status(200).json({ status: "success" });
};

// middleware for making sure a user is logged in
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // seeing if a user has an authorization header and if its starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // taking the token out of the header
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];
  }

  if (!token)
    return next(
      new AppError("You are not logged in! Please login to get access", 401),
    );

  // deconding and verifying the jwt token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // finding the user with the decoded token that has the id in it
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError("The user linked to this token does no longer exist", 401),
    );
  }

  // checking to see if the token is valid for login
  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("User recently changed password! Please login again.", 401),
    );

  // attaching the user details to the request for the next middleware to takeover
  req.user = user;
  next();
});

// middleware for restricting access to routes for specific roles
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );

    next();
  };

// function for updating password manually
exports.updatePassword = catchAsync(async (req, res, next) => {
  if (!req.body.password || !req.body.passwordConfirm) return next();
  const user = await User.findById(req.user.id).select("+password");
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res, true);

  next();
});
