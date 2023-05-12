import React, { useState, useEffect, useContext } from 'react';
import '../css/MangePage.css';
import UserContext from '../UserContext';
import VolunteerList from "../tables/VolunteerList";

function AssoMange() {
  const [isAssoExpanded, setIsAssoExpanded] = useState(false);
  const [activeButton, setActiveButton] = useState(null);  // New state for tracking active button
  const [association, setAssociation] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchAssociation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/associations/Profile/${currentUser.uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch association');
        }
        const associationData = await response.json();
        setAssociation({ id: currentUser.uid, ...associationData });
      } catch (err) {
        console.error(err);
      }
    };
  
    if (currentUser.role === 'association') {
      fetchAssociation();
    } else {
      setAssociation(null);
    }    
  }, [currentUser]);
  

  const handleAssoClick = (section) => {
    setActiveButton(section);  // Set active button when clicked
  }

  const renderContent = () => {
    switch (activeButton) {
      case 'registered':
        return <VolunteerList
        title="מתנדבים רשומים"
        initialVolunteers={association?.listMembers || []}
        isWaitingList={false}
        associationId={association?.id}
      />;
      case 'waiting':
        return <VolunteerList
        title="מתנדבים ממתינים"
        initialVolunteers={association?.WaitingListMembers || []}
        isWaitingList={true}
        associationId={association?.id}
      />;      
      default:
        return <div>Welcome to your dashboard</div>;
    }
  }

  return (
    <div className='page'>
      <h1>עמותת {association && association.associationName}</h1>
      <div className='boxed content'>
        <div className='sidebar'>
          <div className="side-menu">
            <ul>
              <li><a>ראשי</a></li>
              <li>
                <a onClick={() => setIsAssoExpanded(!isAssoExpanded)}>מתנדבים</a>
                {isAssoExpanded &&
                  <ul>
                    <li className={`sub-btn ${activeButton === 'registered' ? 'active' : ''}`}><a onClick={() => handleAssoClick('registered')}>מתנדבים רשומים</a></li>
                    <li className={`sub-btn ${activeButton === 'waiting' ? 'active' : ''}`}><a onClick={() => handleAssoClick('waiting')}>מתנדבים ממתינים</a></li>
                  </ul>
                }
              </li>
              <li><a>אירועים</a></li>
            </ul>
          </div>
        </div>
        <div className='content-area'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AssoMange;
