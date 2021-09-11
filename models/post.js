const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        owner: {
            type: String,
            required: true,
        },
        ownerName: {
            type: String,
        },
        ownerPic: {
            type: String,
        },
        title: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
        },        
        likes: {
            type: Array,
        },
        comments: {
            type: Array,
        }
       },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
