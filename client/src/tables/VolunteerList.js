// VolunteerList.js
import React, {useState, useEffect} from 'react';

function VolunteerList({ title, initialVolunteers, isWaitingList, associationId }) {
    const [volunteers, setVolunteers] = useState([]);
  
    useEffect(() => {
      setVolunteers(initialVolunteers);
    }, [initialVolunteers]);
    
    const handleApprove = async (volunteerId) => {
        try {
          const response = await fetch(`http://localhost:5000/associations/${associationId}/approveVolunteer`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ volunteerId: volunteerId }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to approve volunteer:', errorData); // improved error logging
            throw new Error('Failed to approve volunteer');
          }
          const responseData = await response.json();
          console.log('Approve volunteer response:', responseData); // added logging
          alert('Volunteer approved successfully');
      
          // Update the volunteers list in the state based on the server response
          setVolunteers(responseData.WaitingListMembers);
        } catch (error) {
          console.error('Error approving volunteer:', error);
        }
    };
         
    const handleReject = async (volunteerId) => {
        try {
            const response = await fetch(`http://localhost:5000/associations/${associationId}/rejectVolunteer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ volunteerId: volunteerId }),
            });
            if (!response.ok) {
            throw new Error('Failed to reject volunteer');
            }
            alert('Volunteer rejected successfully');
        
            // Remove the volunteer from the waiting list in the state
            setVolunteers(volunteers.filter(vol => vol.uid !== volunteerId));
        } catch (error) {
            console.error('Error rejecting volunteer:', error);
        }
    };
      

  return (
    <div>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            {isWaitingList && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {volunteers && volunteers.map(volunteer => (
            <tr key={volunteer.uid}>
                <td>{volunteer.firstname} {volunteer.lastname}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.mobilePhone}</td>
                {isWaitingList && (
                    <td>
                        <button onClick={() => handleApprove(volunteer.uid)}>Approve</button>
                        <button onClick={() => handleReject(volunteer.uid)}>Reject</button>
                    </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteerList;
