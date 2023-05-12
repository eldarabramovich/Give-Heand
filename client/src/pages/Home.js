import React from 'react';
import '../css/Home.css';
import hero from '../assets/body.jpg';
import AssoSlide from '../components/AssoSlide';
import EventSilde from '../components/EventSilde';


const Home = () => {
  return (
    <div className="home-page">
      <div className="home-hero">
          <img src={hero} alt="hands" />
      </div>
      <AssoSlide/>
      <EventSilde/>
    </div>
  );
};

export default Home;