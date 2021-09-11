const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        profilePic: {
            type: String,
        },        
        password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },
        followers:{
            type: Array,
        },
        following:{
            type: Array,
        }
       },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
