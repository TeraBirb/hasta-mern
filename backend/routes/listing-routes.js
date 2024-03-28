const express = require("express");
const checkAuth = require("../middleware/check-auth");

const listingController = require("../controllers/listing-controller");
// const checkAuth = require("../middleware/check-auth");

// dont express EXPRESS as a function. rather, use express.Router()
const router = express.Router();

// same middleware methods as app or router() object
// ":" means dynamic value, we don't know the exact value in advance
router.get("/:lid", listingController.getListingById);

// for search results, third-party API calls
// router.post("/search", listingController.saveResultstoDB);

// the big save
router.post("/saveAll", listingController.saveAllListings);

// Dev only tool, to save listings to database
router.post("/", listingController.devAddFake);

// User needs to be authenticated to access the routes below
// router.use(checkAuth);

// to access keys other than id (already taken up by first one),
// for Favorites page
router.get("/user/:uid", listingController.getListingsByUserId);

router.patch("/save", listingController.saveListing);

router.delete("/:uid/:lid", listingController.deleteListingFromFavorites);

// export express.Router() object to access this file from app.js
module.exports = router;
