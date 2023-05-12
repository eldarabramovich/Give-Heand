const { admin } = require("./config/firebase");


const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const idToken = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};


const checkUserRole = (allowedRoles) => async (req, res, next) => {
  try {
    const { uid } = req.user;

    // Fetch user document from Firestore
    const userSnapshot = await admin.firestore().collection("users").doc(uid).get();
    const userData = userSnapshot.data();

    if (!userData) {
      return res.status(404).json({ message: "User not found in Firestore" });
    }

    // Check if user role is in the list of allowed roles
    if (allowedRoles.includes(userData.role)) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized to access this page." });
    }
  } catch (error) {
    console.error("Error checking user role:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { checkUserRole, verifyToken };