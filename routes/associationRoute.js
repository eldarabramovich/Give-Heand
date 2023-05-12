const express = require("express");
const router = express.Router();
const { getAssociationsData, signupAssociation, getAssociationById, joinAssociation, getAssociation, approveVolunteer, rejectVolunteer } = require("../controllers/associationControllers");


router.post("/signup/association", signupAssociation);
router.get("/associationsData", getAssociationsData);
router.get("/associations/Profile/:id", getAssociationById); 
router.get("/associations/associationMangePage/:id", getAssociation);
router.put("/associations/join/:id", joinAssociation);
router.put("/associations/:id/approveVolunteer", approveVolunteer);
router.put("/associations/:id/rejectVolunteer", rejectVolunteer);


module.exports = router;