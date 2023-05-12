import React, { useState, useEffect } from "react";
import { db } from '../config/firebaseClient'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import Slider from "./Slider";
import Cards from "./Cards";



const AssoSlide = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = collection(db, "Associations");
      const associationsQuery = query(usersCollection, where("role", "==", "association"));
      const associationsSnapshot = await getDocs(associationsQuery);
      const associations = associationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(associations);
    };
    fetchData();
  }, []);


  return (
    <div className='boxed'>
      <h2>עמותות</h2>
      <Slider>
        {cards.map((card, index) => (
          <div key={index} className="card-container">
            <Cards data={card} /> {/* Pass the card data */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AssoSlide;
