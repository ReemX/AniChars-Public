const express = require("express");
const {
  getAllLocations,
  getDistribution,
} = require("../controllers/locationsController");

const router = express.Router();

router.route("/").get(getAllLocations);
router.route("/user-distribution").get(getDistribution);

module.exports = router;
