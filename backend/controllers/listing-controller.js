const Listing = require("../models/listing");
const User = require("../models/user");

// GET Request "api/listing/:lid"
const getListingById = async (req, res, next) => {
    const listingId = req.params.lid;

    let listing;
    try {
        listing = await Listing.findById(listingId);
    } catch (err) {
        console.log(err);
        return next(new Error("Could not find listing."));
    }

    if (!listing) {
        return next(new Error("Listing does not exist."));
    }

    res.json(listing);
};

// GET Request "api/listing/search/:query"
// THE MEAT AND POTATOES!!
const saveResultstoDB = async (req, res, next) => {
    const { photos,  } = req.body;

    let listings;
    try {
        // listings = await Listing.find({
        //     address: { $regex: query, $options: "i" },
        // });
        // returning all listings for now
        listings = await Listing.find();
    } catch (err) {
        console.log(err);
        return next(new Error("Could not find listings."));
    }

    if (!listings || listings.length === 0) {
        return next(new Error("No listings found."));
    }

    res.json(listings);
};

// GET Request "api/listing/user/:uid"
// for populating Favorites page
const getListingsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithListings;
    try {
        userWithListings = await User.findById(userId).populate("favorites");
    } catch (err) {
        console.log(err);
        return next(new Error("Could not find user."));
    }

    if (!userWithListings || userWithListings.favorites.length === 0) {
        return next(new Error("No listings found. Maybe add some?"));
    }

    res.json(userWithListings.favorites);
};

// PATCH Request "api/listing/save"
// When user clicks on "Add to Favorites"
const saveListing = async (req, res, next) => {
    const { userId, listingId } = req.body;

    let identifiedUser, identifiedListing;
    try {
        identifiedListing = await Listing.findById(listingId);
        identifiedUser = await User.findById(userId);
    } catch (err) {
        console.log(err);
        return next(new Error("Error finding listing or user by ID."));
    }

    if (!identifiedListing || !identifiedUser) {
        return next(new Error("Listing or User does not exist."));
    }

    try {
        await identifiedUser.favorites.push(identifiedListing);
        await identifiedUser.save();
    } catch (err) {
        console.log(err);
        return next(new Error("Could not save listing."));
    }

    res.status(201).json({ identifiedUser, identifiedListing });
};

// DELETE Request "api/listing/:uid/:lid"
// When user clicks on "Remove from Favorites"
const deleteListingFromFavorites = async (req, res, next) => {
    const userId = req.params.uid;
    const listingId = req.params.lid;

    let identifiedUser;
    try {
        identifiedUser = await User.findById(userId);
    } catch (err) {
        console.log(err);
        return next(new Error("Could not find user or listing."));
    }

    const index = identifiedUser.favorites.indexOf(listingId);
    if (index === -1) {
        throw new Error("Listing not found in favorites.");
    }

    identifiedUser.favorites.splice(index, 1);

    try {
        await identifiedUser.save();
    } catch (err) {
        console.log(err);
        return next(new Error("Could not remove listing."));
    }

    res.json({ message: "Listing removed from favorites." });
};

// export all methods
exports.getListingById = getListingById;
exports.getListingsBySearch = saveResultstoDB;
exports.getListingsByUserId = getListingsByUserId;
exports.saveListing = saveListing;
exports.deleteListingFromFavorites = deleteListingFromFavorites;

// export dev tool
exports.devAddFake = async (req, res, next) => {
    const { address, type, price, beds, baths, sqft } = req.body;
    const createdListing = new Listing({
        photos: [
            "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?cs=srgb&dl=pexels-pixabay-259588.jpg&fm=jpg",
            "https://st.depositphotos.com/1658611/2932/i/450/depositphotos_29329143-stock-photo-street-of-residential-houses.jpg",
            "https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg",
        ],
        address: address || "534 Bros St, Sunnyvale, CA 94085",
        type: type || "House",
        price: price || 4000,
        beds: beds || 3,
        baths: baths || 2,
        sqft: sqft || 2000,
        contact: "https://www.zillow.com/apartments/sunnyvale-ca/ironworks/9VG7n7/",
    });

    try {
        await createdListing.save();
    } catch (err) {
        console.log(err);
        return next(new Error("Could not save listing."));
    }

    res.status(201).json({ listing: createdListing });
};
