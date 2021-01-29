const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const AuthorSchema = new Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
});

AuthorSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

AuthorSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
