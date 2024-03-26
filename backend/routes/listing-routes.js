const express = require("express");
const { check } = require("express-validator");

const listingController = require("../controllers/places-controller");
// const checkAuth = require("../middleware/check-auth");

// dont express EXPRESS as a function. rather, use express.Router()
const router = express.Router();

// same middleware methods as app or router() object
// ":" means dynamic value, we don't know the exact value in advance
router.get("/:lid", listingController.getListingById);

// for search results, third-party API calls
router.get("/search/:query", listingController.getListingsBySearch);

// to access keys other than id (already taken up by first one),
// add another "directory" or segment: e.g. /users/
// for Favorites page
router.get("/user/:uid", listingController.getListingsByUserId);

// all requests except GET requires a token
// router.use(checkAuth);

router.post(
    "/",
    listingController.saveListing
);

router.delete("/:lid", listingController.deleteListingFromFavorites);

// export express.Router() object to access this file from app.js
module.exports = router;
