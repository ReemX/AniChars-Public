const express = require("express");

const {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  createUser,
  updateCurrentUser,
  deleteCurrentUser,
  getCurrentUser,
} = require("../controllers/userController");
const {
  signup,
  login,
  updatePassword,
  protect,
  restrictTo,
  logout,
} = require("../controllers/authController");
const {
  uploadSinglePhoto,
  resizeSinglePhoto,
} = require("../controllers/handlerFactory");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.use(protect);

router.patch(
  "/updateDetails",
  uploadSinglePhoto,
  resizeSinglePhoto,
  updatePassword,
  updateCurrentUser,
);
router.patch("/deleteActive", deleteCurrentUser);

router.get("/me", getCurrentUser, getUser);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
