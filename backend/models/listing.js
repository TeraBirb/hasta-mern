// mongoose schema

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    photos: {type: Array},
    location: {type: Object},
    price: {type: Number},
    contact: {type: String},
    tags: {type: Array},
    description: {type: Object},
});

listingSchema.plugin(uniqueValidator);

listingSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Listing", listingSchema);