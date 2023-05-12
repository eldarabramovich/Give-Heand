import React, { useState, useEffect } from 'react';
import '../css/MangePage.css';

function Dashboard() {
  const [selectedType, setSelectedType] = useState('');
  const [userList, setUserList] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/getUsersData');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await response.json();
        setUserList(usersData);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/getRecentUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch recent users');
        }
        const recentUsersData = await response.json();
        setRecentUsers({
          volunteers: recentUsersData.volunteers,
          associations: recentUsersData.associations,
        });
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchRecentUsers();
  }, []);
  

  const handleButtonClick = (type) => {
    setSelectedType(type);
  };

  const renderUserList = () => {
    if (selectedType === 'associations') {
      return (
        <div>
          <h2>עמותות</h2>
          <table>
            <thead>
              <tr>
                <th>שם העמותה</th>
                <th>שם הנציג</th>
                <th>דוא"ל העמותה</th>
                <th>טלפון הנציג</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.associationName}</td>
                  <td>{user.associationrecruiterName}</td>
                  <td>{user.associationEmail}</td>
                  <td>{user.recruiterMobilePhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  
    if (selectedType === 'volunteers') {
      return (
        <div>
          <h2>מתנדבים</h2>
          <table>
            <thead>
              <tr>
                <th>שם פרטי</th>
                <th>שם משפחה</th>
                <th>דוא"ל</th>
                <th>טלפון נייד</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.mobilePhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (selectedType === 'home') {
      return (     
        <div>
          <h3>מתנדבים שנרשמו לאחרונה</h3>
          <table>
            <thead>
              <tr>
                <th>שם פרטי</th>
                <th>שם משפחה</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.volunteers.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          <br/>
          <h3>עמותות שנרשמו לאחרונה</h3>
          <table>
            <thead>
              <tr>
                <th>שם העמותה</th>
                <th>שם הנציג</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.associations.map((user) => (
                <tr key={user.id}>
                  <td>{user.associationName}</td>
                  <td>{user.associationrecruiterName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>

      );
    }


    return null;
  };
  
  return (
    <div className='page'>
      <h1>דף ניהול האתר</h1>
      <div className='boxed content'>
        <div className='sidebar'>
          <div className="side-menu">
            <ul>
              <li className={`btn ${selectedType === 'home' ? 'active' : ''}`}><a onClick={() => handleButtonClick('home')}>ראשי</a></li>  
              <li className={`btn ${selectedType === 'associations' ? 'active' : ''}`}><a onClick={() => handleButtonClick('associations')}>עמותות</a></li>
              <li className={`btn ${selectedType === 'volunteers' ? 'active' : ''}`}><a onClick={() => handleButtonClick('volunteers')}>מתנדבים</a></li>
              <li><a>אירועים</a></li>
              <li><a>הודעות</a></li>
            </ul>
          </div>
        </div>
        <div className='content-area'>
          {renderUserList()}
        </div>
      </div>
    </div>    
  );
}

export default Dashboard;
