const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  character: {
    type: mongoose.Schema.ObjectId,
    ref: "Character",
    required: true,
  },
  text: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    select: false,
  },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "username role photo" }).populate({
    path: "character",
    select: "name mal_id",
  });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
