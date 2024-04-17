const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllRatings,
  createRating,
  getRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratingController");
const { linkToUserAndCharacter } = require("../controllers/handlerFactory");

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route("/")
  .get(restrictTo("admin"), getAllRatings)
  .post(linkToUserAndCharacter, createRating);
router
  .route("/:id")
  .get(restrictTo("admin"), getRating)
  .patch(updateRating)
  .delete(deleteRating);

module.exports = router;
