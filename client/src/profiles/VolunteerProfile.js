// VolunteerProfile.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

function VolunteerProfile() {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [volunteer, setVolunteer] = useState(null);
  const navigate = useNavigate();

  const fetchVolunteer = async () => {
    try {
      const response = await fetch(`http://localhost:5000/volunteer/Profile/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch volunteer');
      }
      const volunteerData = await response.json();
      setVolunteer({ id, ...volunteerData });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVolunteer();
  }, [id]);

  const handleSettingsButton = () => {
    navigate(`/VolMange/${currentUser.uid}`);
  };

  return (
    <div>
      {volunteer ? (
        <>
          <h2>{volunteer.firstname} {volunteer.lastname} </h2>
          <p>{volunteer.email}</p>
          <p>{volunteer.mobilePhone}</p>
          {/* Only show settings button if this is the current user's profile */}
          {currentUser && currentUser.uid === id && (
            <button onClick={handleSettingsButton}>הגדרות</button>
          )}
          {/* ... other volunteer-specific fields ... */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default VolunteerProfile;
