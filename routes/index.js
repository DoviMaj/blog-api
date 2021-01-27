const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("hi");

  res.redirect("/api");
});

module.exports = router;
