const express = require("express");
const {
  getAllSeries,
  cachedSeries,
  getSeries,
} = require("../controllers/seriesController");
const searchRouter = require("./searchRoutes");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.use("/:SeriesMalId/search", searchRouter);

router.use(protect);

router.route("/").get(restrictTo("admin"), getAllSeries);
router.route("/:malId").get(cachedSeries, getSeries);

module.exports = router;
