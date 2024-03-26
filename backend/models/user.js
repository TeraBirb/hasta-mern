// mongoose schema

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // unique uses index to speed up query, requires mongoose-unique-validator lib
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8}, 
    favorites: [{ type: mongoose.Types.ObjectId, required: true, ref: "favorite" }]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("User", userSchema);