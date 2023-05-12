import React, { useState, useEffect } from 'react';
import '../css/Associations.css';
import Cards from '../components/Cards';
import { db } from '../config/firebaseClient'; // Import the Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions

const Associations = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = collection(db, "Associations");
      const associationsQuery = query(usersCollection, where("role", "==", "association"));
      const associationsSnapshot = await getDocs(associationsQuery);
      const associations = associationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Fetched associations:', associations); // Log the fetched associations
      setCards(associations);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredCards = search
    ? cards.filter(card => {
        if (card.associationName) {
          return card.associationName.toLowerCase().includes(search.toLowerCase());
        }
        return false;
      })
    : cards;

  return (
    <div className='boxed assoPage'> 
      <h2>עמותות</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="cards-section">
        {filteredCards.map((card) => <Cards key={card.id} data={card} />)}
      </div>
    </div>
  );
};

export default Associations;
