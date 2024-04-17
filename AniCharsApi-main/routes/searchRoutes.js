const express = require("express");
const {
  getMixedResults,
  getSeriesResults,
  getCharacterResults,
  getCharacterBySeries,
} = require("../controllers/searchController");
const { protect } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(protect);

router.get("/", getCharacterBySeries);

router.get("/mixed/:query", getMixedResults);
router.get("/series/:query", getSeriesResults);
router.get("/character/:query", getCharacterResults);

module.exports = router;
