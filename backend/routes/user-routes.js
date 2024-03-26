const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.post(
    "/signup",
    [
        check("username").isLength({ min: 4 }),
        check("password").isLength({ min: 8 }),
        check("password").matches(/\d/),
        check("confirmPassword").matches("password")
    ],
    userController.signup
);

router.post("/login", userController.login);

//export
module.exports = router;
