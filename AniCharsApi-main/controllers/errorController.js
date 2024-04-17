const AppError = require("../utils/AppError");

// function for handling cast errors in production
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// function for handling duplicate errors in production
const handleDuplicateFieldsDB = (err) => {
  let value = JSON.stringify(err.keyValue);
  value = value.replaceAll('"', "'");
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// function for handling validation errors in production
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// function for handling jwt errors in production
const handleJWTError = () =>
  new AppError("Invalid token. Please login again", 401);

// function for handling jwt expire errors in production
const handleJWTExpiredError = () =>
  new AppError("Token Expired. Please login again", 401);

// function for sending the developer errors
const sendErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });

// function for sending the developer errors in production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

// all errors in the program end up here
module.exports = (err, req, res, next) => {
  // default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // checking to see enviorment mode (development / production) and sending the appropriate error format
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message };
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
