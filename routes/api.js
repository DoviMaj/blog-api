const express = require("express");
const Post = require("../models/post");
const router = express.Router();

// ROUTES

/* index route*/
router.get("/", function (req, res, next) {
  res.redirect("/api/posts");
});

// create post - api/posts
router.post("/posts", function (req, res, next) {
  // title, date - default to created time, author, published - default to false
  console.log(req.body);
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
    res.status(200).json({ msg: "posts sent" });
  });
});

// read/get all posts - api/posts
router.get("/posts", async function (req, res, next) {
  try {
    const posts = await Post.find({});
    if (!posts) {
      res.status(404).json({ err: "posts not found" });
    }
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
});

// read/get post - api/posts/:id
router.get("/posts/:id", async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ err: `posts with id ${req.params.id} not found` });
    }
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
});

// update post - api/posts/:postid
router.put("/posts/:id", function (req, res, next) {
  res.json({ p: "update" });
});

// delete post - api/posts/:postid
router.delete("/posts/:id", async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ err: `posts with id ${req.params.id} not found` });
    }
    res.status(200).json({ msg: `post ${req.params.id} deleted sucessfuly` });
  } catch (err) {
    next(err);
  }
});

// create comment - api/posts/:postid/comments
// read/get comment - api/posts/:postid/comments
// update comment - api/posts/:postid/comments/:commentid
// delete comment - api/posts/:postid/comments/:commentid

// create author - api/register
// login - api/login
// logout - api/logout

module.exports = router;
