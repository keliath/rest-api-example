const express = require("express");
const { route } = require("./feed");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail Address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().notEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.get("/status", isAuth, authController.getStatus);
router.patch(
  "/status",
  isAuth,
  [body("status").trim().notEmpty()],
  authController.putStatus
);

module.exports = router;
