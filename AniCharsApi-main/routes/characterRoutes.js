const express = require("express");
const {
  getAllCharacters,
  getCharacter,
  cachedCharacter,
} = require("../controllers/characterController");
const { protect, restrictTo } = require("../controllers/authController");
const commentRouter = require("./commentRoutes");
const ratingRouter = require("./ratingRoutes");

const router = express.Router();

router.use("/:characterId/comments", commentRouter);
router.use("/:characterId/ratings", ratingRouter);

router.use(protect);

router.route("/").get(restrictTo("admin"), getAllCharacters);
router.route("/:malId").get(cachedCharacter, getCharacter);

module.exports = router;
