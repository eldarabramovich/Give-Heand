const express = require("express");
const router = express.Router();
const { getAllUsers, getRecentUsers } = require("../controllers/adminController");

router.get("/getUsersData", getAllUsers);
router.get("/getRecentUsers", getRecentUsers);


module.exports = router;