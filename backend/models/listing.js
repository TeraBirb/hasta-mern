// mongoose schema

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    // unique uses index to speed up query, requires mongoose-unique-validator lib
    photos: {type: Array},
    address: {type: String, unique: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    beds: {type: Number, required: true},
    baths: {type: Number, required: true},
    sqft: {type: Number, required: true},
    contact: {type: String},
});

listingSchema.plugin(uniqueValidator);

listingSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Listing", listingSchema);