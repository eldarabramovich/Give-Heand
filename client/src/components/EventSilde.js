import React, { useState } from "react";
import Slider from "./Slider";
import Cards from "./Cards";

const EventSilde = () => {
  const [cards, setCards] = useState([]);

  const addCard = () => {
    const newCard = {};
    setCards([...cards, newCard]);
  };

  const removeLastCard = () => {
    setCards(cards.slice(0, -1));
  };

  return (
    <div className='boxed'>
      <h2>אירועים</h2>
      <button onClick={addCard}>Add Card</button>
      <button onClick={removeLastCard} disabled={cards.length === 0}>
        Remove Card
      </button>
      <Slider>
        {cards.map((card, index) => (
          <div key={index} className="card-container">
            <Cards />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventSilde;
