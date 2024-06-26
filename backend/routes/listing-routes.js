const express = require("express");
const checkAuth = require("../middleware/check-auth");
const rateLimit = require("../middleware/rate-limit");

const listingController = require("../controllers/listing-controller");
// const checkAuth = require("../middleware/check-auth");

// dont express EXPRESS as a function. rather, use express.Router()
const router = express.Router();

// Apply rate limiting middleware only to the searchListings route
router.post("/", rateLimit, listingController.searchListings)

// same middleware methods as app or router() object
// ":" means dynamic value, we don't know the exact value in advance
router.get("/:lid", listingController.getListingById);

// for search results, third-party API calls
// router.post("/search", listingController.saveResultstoDB);

// check if user has listing in favorites
router.get("/check/:uid/:lid", listingController.getListingsCheck);

// to access keys other than id (already taken up by first one),
// for Favorites page
router.get("/user/:uid", listingController.getListingsByUserId);

// clear listings that are not saved by any user
router.delete("/clear", listingController.clearListings);

// Dev only tool, to save listings to database
router.post("/dev", listingController.devAddFake);

// User needs to be authenticated to access the routes below
router.use(checkAuth);

router.patch("/save", listingController.saveListing);

router.delete("/:uid/:lid", listingController.deleteListingFromFavorites);

// export express.Router() object to access this file from app.js
module.exports = router;
