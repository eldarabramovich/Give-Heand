const admin = require("../config/firebase");
const fs = require('fs').promises;
const path = require('path');


const getAllUsers = async (req, res) => {
    try {
      const volunteersSnapshot = await admin.firestore().collection("Volunteers").get();
      const associationsSnapshot = await admin.firestore().collection("Associations").get();
  
      const volunteers = volunteersSnapshot.docs.map((doc) => doc.data());
      const associations = associationsSnapshot.docs.map((doc) => doc.data());
  
      const allUsers = [...volunteers, ...associations];
  
      res.status(200).json(allUsers);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ message: "Failed to fetch all users." });
    }
  };

  const getRecentUsers = async (req, res) => {
    try {
      const now = admin.firestore.Timestamp.now();
      const lastWeekSeconds = now.seconds - 7 * 24 * 60 * 60;
      const lastWeekTimestamp = new admin.firestore.Timestamp(lastWeekSeconds, 0);
  
      const volunteersSnapshot = await admin.firestore().collection("Volunteers")
        .where("currentDate", ">=", lastWeekTimestamp)
        .get();
  
      const associationsSnapshot = await admin.firestore().collection("Associations")
        .where("currentDate", ">=", lastWeekTimestamp)
        .get();

      const volunteers = volunteersSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      const associations = associationsSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        
      const recentUsers = { volunteers, associations };
      res.status(200).json(recentUsers);
    } catch (error) {
      console.error("Error fetching recent users:", error);
      res.status(500).json({ message: "Failed to fetch recent users." });
    }
  };
  
  

module.exports = { getAllUsers, getRecentUsers }