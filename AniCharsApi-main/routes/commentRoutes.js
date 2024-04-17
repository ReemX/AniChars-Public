const express = require("express");
const {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect, restrictTo } = require("../controllers/authController");
const { linkToUserAndCharacter } = require("../controllers/handlerFactory");

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route("/")
  .get(getAllComments)
  .post(linkToUserAndCharacter, createComment);
router
  .route("/:id")
  .get(restrictTo("admin"), getComment)
  .patch(updateComment)
  .delete(deleteComment);

module.exports = router;
