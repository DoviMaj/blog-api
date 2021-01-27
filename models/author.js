const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Author = mongoose.model(
  "Author",
  new Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
  })
);

module.exports = Author;
