const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// POST Request "api/users/signup"
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new Error("Invalid inputs passed."));
    }

    // ideally transmitted via HTTPS
    const { username, password, confirmPassword } = req.body;

    // throw error if email already exists
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
        return next(new Error("Something went wrong during signup."));
    }

    if (existingUser) {
        return next(new Error("Username already exists!"));
    }

    // encrypt password, 12 salting rounds
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(new Error("Could not hash password.", 500));
    }

    const createdUser = new User({
        username,
        // dont store password in plain text!! big yikes!
        password: hashedPassword,
        favorites: [],
    });

    try {
        await createdUser.save();
    } catch (err) {
        console.log(err);
        return next(new Error("Something went wrong saving new user."));
    }

    // Generate JWT
    let token;

    try {
        token = jwt.sign(
            { userId: createdUser.id, username: createdUser.username },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
    } catch (err) {
        return next(new Error("Could not sign token."));
    }

    res.status(201).json({
        userId: createdUser.id,
        username: createdUser.username,
        token: token,
    });
};

// POST Request "api/users/login"
const login = async (req, res, next) => {
    const { username, password } = req.body;

    let identifiedUser;
    try {
        identifiedUser = await User.findOne({ username: username });
    } catch (err) {
        console.log(err);
        return next(new Error("Something went wrong logging in"));
    }

    if (!identifiedUser) {
        return next(new Error("Could not find user."));
    }

    // check if password is correct
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(
            password,
            identifiedUser.password
        );
        console.log(isValidPassword);
    } catch (err) {
        return next(
            new Error("Something went wrong during password comparison.")
        );
    }

    if (!isValidPassword) {
        return next(new Error("Incorrect password."));
    }

    let token;

    try {
        token = jwt.sign(
            { userId: identifiedUser.id, username: identifiedUser.username },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
    } catch (err) {
        return next(new Error("Something went wrong signing token during login."));
    }

    res.json({ userId: identifiedUser.id, username: identifiedUser.username, token });
};

exports.signup = signup;
exports.login = login;