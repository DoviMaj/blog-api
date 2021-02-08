const express = require("express");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const author_controller = require("../controllers/authorController");
const passport = require("passport");
const router = express.Router();

// ROUTES

/* index route*/
router.get("/", function (req, res, next) {
  res.redirect("/api/posts");
});

// create post - api/posts
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.create_post
);

// read/get all posts - api/posts
router.get("/posts", post_controller.get_posts);

// read/get post - api/posts/:id
router.get("/posts/:id", post_controller.get_single_post);

// update post - api/posts/:postid
router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.update_post
);

// delete post - api/posts/:postid
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.delete_post
);

// create comment - api/posts/:postid/comments
router.post("/posts/:postid/comments", comment_controller.create_comment);

// read/get single comment - api/posts/:postid/comments/:commentid
router.get(
  "/posts/:postid/comments/:commentid",
  comment_controller.get_comment
);

// read/get all comments - api/posts/:postid/comments
router.get("/posts/:postid/comments", comment_controller.get_comments);

// update comment - api/posts/:postid/comments/:commentid
router.put(
  "/posts/:postid/comments/:commentid",
  passport.authenticate("jwt", { session: false }),
  comment_controller.update_comment
);

// DELETE ALL POST COMMENTS
router.delete(
  "/posts/:postid/comments",
  passport.authenticate("jwt", { session: false }),
  comment_controller.delete_post_comments
);

// delete comment - api/posts/:postid/comments/:commentid
router.delete(
  "/posts/:postid/comments/:commentid",
  passport.authenticate("jwt", { session: false }),
  comment_controller.delete_comment
);

// create author - api/signup
router.post("/sign-up", author_controller.signup);

// login - api/login
router.post("/login", author_controller.login);

// logout - api/logout
router.get("/logout", author_controller.logout);

module.exports = router;
