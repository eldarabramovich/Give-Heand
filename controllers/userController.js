const admin = require("../config/firebase");
const fs = require('fs').promises;
const path = require('path');


const loginUser = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get the user's document from Firestore
    const firestore = admin.firestore();

    // Define the collections to search for the user
    const collections = ["Volunteers", "Associations", "Admin"];
    let userDoc = null;
    for (const collection of collections) {
      const doc = await firestore.collection(collection).doc(uid).get();

      if (doc.exists) {
        userDoc = doc.data();
        break;
      }
    }
    if (!userDoc) {
      res.status(404).json({ message: "User document not found.", uid });
      return;
    }

    // Merge the role, token, uid, and other user data into a single object
    const responseData = {
      message: "Logged in successfully",
      token: idToken,
      id: uid,
      ...userDoc
    };

    res.status(200).json(responseData);

  } catch (error) {
    console.error("Error logging.", error);
    res.status(500).json({ message: "Failed to log.", error });
  }
};


const getUserMangePage = async (req, res) => {
  try {
    const userId = req.user.uid; // Get user UID from the request

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch user record from Firebase
    const userRecord = await admin.auth().getUser(userId);

    // Get custom claims (e.g., associations)
    //const customClaims = userRecord.customClaims || {};

    const userProfile = {
      name: userRecord.displayName,
      email: userRecord.email,
      phoneNumber: userRecord.phoneNumber,
      //photoURL: userRecord.photoURL,
      //associations: customClaims.associations, // Get associations from custom claims
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Error getting user profile' });
  }
};

module.exports = { getUserMangePage, loginUser };