import React, { useState } from 'react';
import './SingleCard.css';

const cardFrontImage = [
    {"src":"/img/crown.jpg"}
  ]

function SingleCard({ card, handleChoice }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    handleChoice(card);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
         <div className="card-front">
            {isFlipped ? (
          <img src={card.src} alt="Card Back" /> 
            ) : (
            <img src={cardFrontImage[0].src} alt="Card Front"/>
            )}
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
