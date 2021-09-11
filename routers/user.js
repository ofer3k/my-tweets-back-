const express = require("express");
const router = express.Router();

const {
    createUser,
    signIn,
    readUser,
    getAllUsersForSearch,
    followUser,
    unFollowUser,
    updateUser,
    getUsersByName,
    uploadPhoto
} = require("../controllers/user");

router.post("/uploadPhoto", uploadPhoto);
router.post("/createUser", createUser);
router.post("/signIn", signIn);
router.post("/readUser", readUser);
router.post("/getAllUsersForSearch", getAllUsersForSearch);
router.post("/followUser", followUser);
router.post("/unFollowUser", unFollowUser);
router.post("/updateUser", updateUser);
router.post("/getUsersByName", getUsersByName);


module.exports = router;