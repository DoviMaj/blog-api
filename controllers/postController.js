const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.create_post = [
  body("author_name", "Empty name").trim().escape(),
  body("title", "text").trim().escape(),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    // title, date - default to created time, author, published - default to false
    const { author_name, title, text } = req.body;
    const post = new Post({
      author_name,
      title,
      text,
    });
    post.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ msg: "post sent" });
    });
  },
];

exports.get_posts = async function (req, res, next) {
  try {
    const posts = await Post.find({});
    if (!posts) {
      return res.status(404).json({ err: "posts not found" });
    }
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.get_single_post = async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ err: `post with id ${req.params.id} not found` });
    }
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

exports.update_post = async function (req, res, next) {
  try {
    const { author_name, title, text } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, {
      author_name,
      title,
      text,
    });
    if (!post) {
      return res.status(404).json({ msg: "updated sucessfuly" });
    }
    res.status(200).json({ msg: "updated sucessfuly" });
  } catch (err) {
    next(err);
  }
};

exports.delete_post = async function (req, res, next) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ err: `posts with id ${req.params.id} not found` });
    }
    res.status(200).json({ msg: `post ${req.params.id} deleted sucessfuly` });
  } catch (err) {
    next(err);
  }
};
