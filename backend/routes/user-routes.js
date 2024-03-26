const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post(
    "/signup",
    [
        check("username")
            .isLength({ min: 4 })
            .withMessage("Username must be at least 4 characters long"),
        check("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long"),
        check("password")
            .matches(/\d/)
            .withMessage("Password must contain a number"),
        check("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                return true;
            })
            .withMessage("Passwords must match"),
    ],
    userController.signup
);

router.post("/login", userController.login);

// User needs to be authenticated to change credentials, disable when using POSTMAN
// router.use(checkAuth);

router.patch("/change-credentials", userController.changeCredentials);

//export
module.exports = router;
