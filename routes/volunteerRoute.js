//volunteerRoute.js
const express = require("express");
const router = express.Router();
const { signupVolunteer, getVolunteerById, deleteAssociation } = require("../controllers/volunteerController");


router.post("/signup/volunteer", signupVolunteer);
router.get("/volunteer/Profile/:id", getVolunteerById); 
router.put("/volunteers/deleteAssociations/:id", deleteAssociation); 

module.exports = router;