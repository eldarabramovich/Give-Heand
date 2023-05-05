import React from 'react';
import '../css/Cards.css';
import hero from '../assets/body.jpg';

const Cards = () => {
  return (
    <div className="card">
        <div className="card-img">
            <img src={hero} alt="hands" />
        </div>

        <div className="card-content">
            <span>
            <h3>משתנה</h3>
            <p>לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר</p>
            </span>
            <button>הרשמה</button>
        </div>
    </div>
  );
};

export default Cards;