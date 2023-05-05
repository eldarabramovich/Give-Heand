import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Associations from './pages/Associations';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Associations" element={<Associations />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />      
    </div>
  );
}

export default App;
