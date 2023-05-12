import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Cards.css';
import hero from '../assets/body.jpg';

const Cards = ({ data }) => {
  const { associationName, id } = data; // Replace with the appropriate property names from your Firestore data

  return (
    <div className="card">
      <div className="card-img">
        <img src={hero} alt="hands" />
      </div>

      <div className="card-content">
        <span>
          <h3>{associationName}</h3>
          <p>בלה בלה</p>
        </span>
        <Link to={`/associationProfile/${id}`}>
          <button>לפרטים</button>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
