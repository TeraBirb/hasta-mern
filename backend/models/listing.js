// mongoose schema

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    // unique uses index to speed up query, requires mongoose-unique-validator lib
    // _id: {type: Number, required: true},
    photos: {type: Array},
    location: {type: Object},
    // type: {type: String, required: true},
    price: {type: Number, required: true},
    contact: {type: String},
    tags: {type: Array},
    description: {type: Object, required: true},
    // user: {type: mongoose.Types.ObjectId, required: true, ref: "User"}
});

listingSchema.plugin(uniqueValidator);

listingSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Listing", listingSchema);