const express = require("express");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// ROUTES

/* index route*/
router.get("/", function (req, res, next) {
  res.redirect("/api/posts");
});

// create post - api/posts
router.post("/posts", [
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
]);

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
      res.status(404).json({ err: `post with id ${req.params.id} not found` });
    }
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
});

// update post - api/posts/:postid
router.put("/posts/:id", async function (req, res, next) {
  try {
    const { author_name, title, text } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, {
      author_name,
      title,
      text,
    });
    res.json({ msg: "updated sucessfuly" });
  } catch (err) {
    next(err);
  }
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
router.post("/posts/:postid/comments", [
  body("text", "Empty text").trim().escape(),
  body("user", "Empty user").trim().escape(),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    // title, date - default to created time, author, published - default to false
    const { text, user } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.commentid, {
      text,
      user,
    });
    comment.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ msg: "comment sent" });
    });
  },
]);

// read/get single comment - api/posts/:postid/comments/:commentid
router.get(
  "/posts/:postid/comments/:commentid",
  async function (req, res, next) {
    try {
      const comment = await Comment.findById(req.params.commentid);
      if (!comment) {
        res
          .status(404)
          .json({ err: `comment with id ${req.params.commentid} not found` });
      }
      res.status(200).json({ comment });
    } catch (err) {
      next(err);
    }
  }
);

// read/get comments - api/posts/:postid/comments
router.get("/posts/:postid/comments", async function (req, res, next) {
  try {
    const comments = await Comment.find({});
    if (!comments) {
      res.status(404).json({ err: `comments not found` });
    }
    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
});

// update comment - api/posts/:postid/comments/:commentid
router.put(
  "/posts/:postid/comments/:commentid",
  async function (req, res, next) {
    try {
      const { text, user } = req.body;
      const comment = await Comment.findByIdAndUpdate(req.params.commentid, {
        text,
        user,
      });
      res.json({ msg: "updated sucessfuly" });
    } catch (err) {
      next(err);
    }
  }
);

// delete comment - api/posts/:postid/comments/:commentid
router.delete(
  "/posts/:postid/comments/:commentid",
  async function (req, res, next) {
    try {
      const comment = await Comment.findById(req.params.commentid);
      if (!comment) {
        res
          .status(404)
          .json({ err: `comment with id ${req.params.id} not found` });
      }
      res
        .status(200)
        .json({ msg: `comment ${req.params.id} deleted sucessfuly` });
    } catch (err) {
      next(err);
    }
  }
);

// create author - api/register
// login - api/login
// logout - api/logout

module.exports = router;
