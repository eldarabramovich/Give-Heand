const express = require("express");
const router = express.Router();
const { loginUser, getUserMangePage } = require("../controllers/userController");
const { verifyToken } = require("../middlewares");

router.post("/login", loginUser);
router.get("/VolunteerProfile", verifyToken, getUserMangePage);


module.exports = router;