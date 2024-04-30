const axios = require("axios");

const Listing = require("../models/listing");
const User = require("../models/user");
const RequestCount = require("../models/requestCount"); // for rate limiting

const { ObjectId } = require("mongoose").Types;

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

// GET request "api/listing/check/:uid"
// for checking if a listing is in favorites
const getListingsCheck = async (req, res, next) => {
    const userId = req.params.uid;
    const listingId = req.params.lid;

    let isListingInFavorites;
    let userWithListings;
    try {
        userWithListings = await User.findById(userId).populate("favorites");
        isListingInFavorites = userWithListings.favorites.some(
            (listing) => listing._id.toString() === listingId
        );
    } catch (err) {
        console.log(err);
        return next(new Error("Could not find user."));
    }

    if (!userWithListings) {
        return next(new Error("User does not exist."));
    }

    // respond with true if listing is in favorites, false otherwise
    res.json({ isListingInFavorites });
};

// GET Request "api/listing/user/:uid/"
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

// POST Request "api/listing/searchListings/???/"
const searchListings = async (req, res, next) => {
    const search = req.body;
    // let city, stateCode;
    // LIMITED USAGE HERE
    try {
        // Geocoding
        const geocodingResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                search.searchInput
            )}&key=${process.env.GOOGLE_API_KEY}`
        );

        // INSERT ERROR HANDLING HERE FOR NO RESULTS FOUND
        if (geocodingResponse.data.status === "ZERO_RESULTS") {
            return next(new Error("No results found for your search."));
        }

        const suggestedCity =
            geocodingResponse.data.results[0].address_components[0].long_name;
        const suggestedStateCode =
            geocodingResponse.data.results[0].address_components[2].short_name;

        const options = {
            method: "GET",
            url: "https://us-real-estate.p.rapidapi.com/v2/for-rent",
            params: {
                city: suggestedCity,
                state_code: suggestedStateCode,
                limit: "42",
                beds_min: search.minBedrooms,
                baths_min: search.minBathrooms,
                price_min: search.minPrice,
                price_max: search.maxPrice,
                property_type: search.selectedPropertyTypes,
                expand_search_radius: "25",
            },
            headers: {
                "X-RapidAPI-Key": process.env.USA_REAL_ESTATE_API_KEY,
                "X-RapidAPI-Host": process.env.USA_REAL_ESTATE_API_HOST,
            },
        };

        // Make the second request
        const response = await axios.request(options);
        const results = response.data.data.home_search.results;
        // console.log(results);

        // Extract data and save to database
        const extractedData = results.map((result) => ({
            photos: result.photos,
            location: result.location,
            price:
                result.list_price ||
                result.list_price_min ||
                result.list_price_max,
            contact: result.href,
            description: result.description,
            tags: result.tags,
        }));

        console.log("Extracted data and saving all to database!");

        // Save to database while ignoring duplicates
        const createdDocs = await Listing.insertMany(extractedData, { ordered: false });
        console.log("Results saved to database.");

        // console.log("Here are the created docs!");
        // console.log(createdDocs.data);
        res.json(createdDocs);
    } catch (err) {
        console.error(err);
        return next(new Error("Error finding listings for your search."));
    }
};

// PATCH Request "api/listing/save"
// When user clicks on "Add to Favorites"
// V1
const saveListing = async (req, res, next) => {
    const { userId, listingId } = req.body;

    // const listingObjectId = new ObjectId(listingId);
    console.log(userId, " ||| ", listingId);

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
        console.log(identifiedUser);
        // identifiedUser.favorites.push(listingId);
        // identifiedUser.favorites.push(identifiedListing._id);
        identifiedUser.favorites.push(identifiedListing);
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
        // Find the user by userId
        identifiedUser = await User.findById(userId);

        if (!identifiedUser) {
            throw new Error("User not found.");
        }

        // Remove the listingId from the favorites array
        identifiedUser.favorites.pull(listingId);

        // Save the user after removing the listing from favorites
        await identifiedUser.save();

        res.json({ message: "Listing removed from favorites." });
    } catch (err) {
        console.log(err);
        return next(new Error("Could not remove listing."));
    }
};
// export all methods
exports.getListingById = getListingById;
exports.getListingsCheck = getListingsCheck;
exports.getListingsByUserId = getListingsByUserId;
exports.searchListings = searchListings;
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
        contact:
            "https://www.zillow.com/apartments/sunnyvale-ca/ironworks/9VG7n7/",
    });

    try {
        await createdListing.save();
    } catch (err) {
        console.log(err);
        return next(new Error("Could not save listing."));
    }

    res.status(201).json({ listing: createdListing });
};
