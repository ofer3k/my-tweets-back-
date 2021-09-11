const express = require("express");
const router = express.Router();

const {
    getAllPosts,
    createPost,
    getPostsByFollowing,
    updatePost,
    deletePost
} = require("../controllers/post");

router.get("/getAllPosts", getAllPosts);
router.post("/createPost", createPost);
router.post("/getPostsByFollowing", getPostsByFollowing);
router.post("/updatePost", updatePost);
router.post("/deletePost", deletePost);


module.exports = router;