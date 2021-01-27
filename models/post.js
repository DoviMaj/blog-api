const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  date: { default: Date.now(), type: Date },
  text: { required: true, type: String },
  user: { required: true, type: Object },
  published: { default: false, type: Boolean },
});

postSchema.virtual("date_formated").get(function () {
  return this.date.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minutes: "2-digit",
  });
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
