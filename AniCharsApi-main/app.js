const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const userRouter = require("./routes/userRoutes");
const characterRouter = require("./routes/characterRoutes");
const seriesRouter = require("./routes/seriesRoutes");
const searchRouter = require("./routes/searchRoutes");
const commentRouter = require("./routes/commentRoutes");
const ratingRouter = require("./routes/ratingRoutes");
const favoriteRouter = require("./routes/favoriteRoutes");
const locationsRouter = require("./routes/locationRoutes");
const AppError = require("./utils/AppError");
const errorController = require("./controllers/errorController");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.set("trust proxy", true);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use(xss());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/favorites", favoriteRouter);
app.use("/api/v1/characters", characterRouter);
app.use("/api/v1/series", seriesRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/api/v1/locations", locationsRouter);
app.use("/api/v1/files/profilePhotos", express.static("files/profilePhotos"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
