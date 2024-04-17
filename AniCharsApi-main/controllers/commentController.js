const Comment = require("../models/commentModel");
const {
  createOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} = require("./handlerFactory");

exports.getAllComments = getAll(Comment);
exports.getComment = getOne(Comment);
exports.createComment = createOne(Comment);
exports.deleteComment = deleteOne(Comment);
exports.updateComment = updateOne(Comment);
