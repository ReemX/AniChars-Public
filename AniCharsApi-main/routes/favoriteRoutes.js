const express = require("express");
const { protect } = require("../controllers/authController");
const {
  addFavCharacter,
  removeFavCharacter,
  addFavSeries,
  removeFavSeries,
} = require("../controllers/favoriteController");

const router = express.Router();

router.use(protect);

router
  .route("/characters/:id")
  .post(addFavCharacter)
  .delete(removeFavCharacter);
router.route("/series/:id").post(addFavSeries).delete(removeFavSeries);

module.exports = router;
