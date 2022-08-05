const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const profileController = require("../controllers/profileController");
const { authenticated,authorization } = require("../middlewares/auth");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

router.post("/user/:userId", authenticated, profileController.profileFile);
router.put(
  "/user/:userId",
  authenticated,
  authorization,
  profileController.updateprofilDetails
);

router.all("/**", function (req, res) {
  res.status(404).send({
    status: false,
    msg: "The api you request is not available",
  });
});

module.exports = router;
