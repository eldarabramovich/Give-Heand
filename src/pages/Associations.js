import React, { useState } from 'react';
import '../css/Associations.css';
import Cards from '../components/Cards';

const Associations = () => {
  const [cards, setCards] = useState([]);
  
  const addCard = () => {
    const newCard ={};
    setCards([...cards, newCard]);
  }

  const removeLastCard = () => {
    setCards(cards.slice(0, -1));
  }

  return (
    <div className='boxed assoPage'> 
      <h2>עמותות</h2>
      <button onClick={addCard}>Add Card</button>
      <button onClick={removeLastCard} disabled={cards.length === 0}>
        Remove Card
      </button>
      <div className="cards-section">
        {cards.map((card) => <Cards />)}
      </div>
    </div>

  );
};

export default Associations;