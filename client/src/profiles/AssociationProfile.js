//AssociationProfile
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // import useNavigate
import UserContext from '../UserContext';
import "../css/AssociationProfile.css"

function AssociationProfile() {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [association, setAssociation] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState(null);
  const navigate = useNavigate();

  const fetchAssociation = async () => {
    try {
      const response = await fetch(`http://localhost:5000/associations/Profile/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch association');
      }
      const associationData = await response.json();
      setAssociation({ id, ...associationData });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssociation();
  }, [association]);

  useEffect(() => {
    if (association && currentUser.role === "volunteer") {
      const isMember = association.listMembers.some(member => member.uid === currentUser.uid);
      const isWaiting = association.WaitingListMembers.some(member => member.uid === currentUser.uid);
      if (isMember) {
        setMembershipStatus('member');
      } else if (isWaiting) {
        setMembershipStatus('waiting');
      } else {
        setMembershipStatus('none');
      }
    }else if(association && currentUser.role === "association"){
      setMembershipStatus('owner');
    }
  }, [association, currentUser]);



  const handleJoinClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/associations/join/${association.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: currentUser.id, //maybe not need
          firstname: currentUser.firstname,
          lastname: currentUser.lastname,
          mobilePhone: currentUser.mobilePhone,
          email: currentUser.email 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to join association');
      }
 
      // Optionally, refresh the association data to reflect the new membership
      fetchAssociation();
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleSettingsButton = () => {
    navigate(`/AssoMange/${currentUser.uid}`);
  };

  const renderJoinButton = () => {
    if (!currentUser) return null;

    switch (membershipStatus) {
      case 'member':
        return (
          <button className="btn" disabled>Already Registered</button>
        );
      case 'waiting':
        return (
          <button className="btn" disabled>Waiting</button>
        );
      case 'owner':
        return (
          <button className="btn" onClick={handleSettingsButton} >הגדרות</button>
        );
      default:
        return (
          <button className="btn" onClick={handleJoinClick}>Join</button>
        );
    }
  };


  return (
    <div className='profile'>
      {association ? ( <>
          <h2>{association.associationName}</h2>
          <h2>Recruiter Name: {association.associationrecruiterName}</h2>
          <h2>Email: {association.associationEmail}</h2>
          <h2>Phone: {association.recruiterMobilePhone}</h2>
          {renderJoinButton()}
         </>) : ( 
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AssociationProfile;
