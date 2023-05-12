// App.js
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import { auth } from './config/firebaseClient';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Associations from './pages/Associations';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Dashboard from "./mangePages/Dashboard";
import VolMange from "./mangePages/VolMange";
import AssoMange from "./mangePages/AssoMange";
import AssociationProfile from "./profiles/AssociationProfile";
import VolunteerProfile from "./profiles/VolunteerProfile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user ? { uid: user.uid, email: user.email } : null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
          <Navbar />
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Associations" element={<Associations />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Dashboard/:id" element={<Dashboard />} />
              <Route path="/AssoMange/:id" element={<AssoMange />} />
              <Route path="/VolMange/:id" element={<VolMange />} />
              <Route path="/associationProfile/:id" element={<AssociationProfile />} />
              <Route path="/volunteerProfile/:id" element={<VolunteerProfile />} />
            </Routes>
          </div>
          <Footer />      
      </div>
    </UserContext.Provider>
  );
}

export default App;

