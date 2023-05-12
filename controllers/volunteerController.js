//volunteerController.js
const admin = require("../config/firebase");
const fs = require('fs').promises;
const path = require('path');
const date = new Date();


const signupVolunteer = async (req, res) => {
  const { firstName, lastName, email, mobilePhone, password } = req.body;

  try {
    // Create a new user with email and password
    const user = await admin.auth().createUser({
      email,
      password,
    });

    // Store additional data in the Firestore
    const firestore = admin.firestore();
    const currentDate = admin.firestore.Timestamp.now();
    await firestore.collection("Volunteers").doc(user.uid).set({
      firstName,
      lastName,
      email,
      mobilePhone, 
      role: "volunteer",
      events: [],
      listAssociations: [],  // changed ListAssociations to listAssociations
      profile: [],
      currentDate,
    });
    
    res.status(201).json({ message: "Volunteer registered successfully.", uid: user.uid });
  } catch (error) {
    console.error("Error registering volunteer.", error);
    res.status(500).json({ message: "Failed to register volunteer.", error });
  }
};

const getVolunteerById = async (req, res) =>{
  const { id } = req.params;
  try {
    const doc = await admin.firestore().collection("Volunteers").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: 'Volunteer not found' });
    } else {
      console.log(doc.data()); // Add this line
      res.status(200).json(doc.data());
    }
  } catch (error) {
    console.error('Error fetching association:', error);
    res.status(500).json({ message: 'Failed to fetch Volunteer.' });
  }
}

const deleteAssociation = async (req, res) => {
  const volunteerId = req.params.id;
  const { associationId } = req.body;

  try {
    // Document references
    const volunteerRef = admin.firestore().collection('Volunteers').doc(volunteerId);
    const associationRef = admin.firestore().collection('Associations').doc(associationId);

    const associationDoc = await associationRef.get();
    const volunteerDoc = await volunteerRef.get();

    if (!associationDoc.exists || !volunteerDoc.exists) {
      return res.status(404).json({ message: 'Association or volunteer not found' });
    }

    const associationData = associationDoc.data();
    const volunteerData = volunteerDoc.data();

    const updatedListAssociations = volunteerData.listAssociations.filter(association => association.uid !== associationId);
    const updatedListMembers = associationData.listMembers.filter(volunteer => volunteer.uid !== volunteerId);

    // Remove the association from the volunteer's listAssociations
    await volunteerRef.update({
      listAssociations: updatedListAssociations
    });

    // Remove the volunteer from the association's listMembers
    await associationRef.update({
      listMembers: updatedListMembers
    });

    res.status(200).json({ message: 'Association deleted successfully.' });
  } catch (error) {
    console.error('Error deleting association:', error);
    res.status(500).json({ message: 'Failed to delete association.' });
  }
};



module.exports = {  signupVolunteer, getVolunteerById, deleteAssociation };