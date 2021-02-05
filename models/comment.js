const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  date: { default: Date.now(), type: Date },
  text: { required: true, type: String },
  user: { required: true, type: String },
  postId: { type: String, required: true },
});

commentSchema.virtual("date_formated").get(function () {
  return this.date.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minutes: "2-digit",
  });
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
