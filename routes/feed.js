const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

//GET /feed/posts
router.get("/posts", feedController.getPosts);

//POST /feed/post
router.post(
  "/post",
  [
    body("title").trim().notEmpty().isLength({ min: 5 }),
    body("content").trim().notEmpty().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get("/post/:postId", feedController.getPost);

router.put(
  "/post/:postId",
  [
    body("title").trim().notEmpty().isLength({ min: 5 }),
    body("content").trim().notEmpty().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

module.exports = router;
