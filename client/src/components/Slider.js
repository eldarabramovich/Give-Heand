import React, { useState } from "react";
import "../css/Slider.css";

const Slider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideCount = Math.ceil(children.length / 3);

  const previousSlide = () => {
    setCurrentSlide((currentSlide - 1 + slideCount) % slideCount);
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slideCount);
  };

  const cardChunks = [];
  for (let i = 0; i < children.length; i += 3) {
    cardChunks.push(children.slice(i, i + 3));
  }

  return (
    <div className="slider-container">
      <button className="slider-button prev" onClick={previousSlide}>
        &#10094;
      </button>
      <div className="slider-content">
        {cardChunks.map((chunk, index) => (
          <div
            className={`slider-item ${index === currentSlide ? "active" : ""}`}
            key={index}
          >
            {chunk}
          </div>
        ))}
      </div>
      <button className="slider-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
