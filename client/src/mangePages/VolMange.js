//VolMange.js
import React, { useState, useEffect, useContext } from 'react';
import '../css/MangePage.css';
import UserContext from '../UserContext';
import AssociationList from "../tables/AssociationList";

function VolMange() {
  const [volunteer, setVolunteer] = useState(null);
  const [activeButton, setActiveButton] = useState(null);  // New state for tracking active button
  const { currentUser } = useContext(UserContext);


  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/volunteer/Profile/${currentUser.uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch volunteer');
        }
        const volunteerData = await response.json();
        setVolunteer({ id: currentUser.uid, ...volunteerData });
        console.log(volunteerData); // Debugging line
      } catch (err) {
        console.error(err);
      }
    };
  
    if (currentUser.role === 'volunteer') {
      fetchVolunteer();
    } else {
      setVolunteer(null);
    }
  }, [currentUser]);
  

  const handleVolClick = (section) => {
    setActiveButton(section);  // Set active button when clicked
  }

  return (
    <div className='page'>
      <h1> שלום {volunteer && volunteer.name}</h1>
      <div className='boxed content'>
        <div className='sidebar'>
          <div className="side-menu">
            <ul>
              <li ><a>ראשי</a></li>  
              <li className={`sub-btn ${activeButton === 'associations' ? 'active' : ''}`}><a onClick={() => handleVolClick('associations')}>עמותות</a></li>
              <li><a>אירועים</a></li>     
            </ul>
          </div>
        </div>
        <div className='content-area'>
        {activeButton === 'associations' && volunteer && volunteer.listAssociations.length > 0 && (
          <AssociationList
            title="עמותות"
            initialAssociations={volunteer.listAssociations || []}
            volunteerId={currentUser.uid}
          />
        )}

        {activeButton === 'events' && (
            <div className="tabcontent">
                <h2>Events</h2>
            </div>              
        )}
        </div>
      </div>
    </div>    
  );
}
export default VolMange;
