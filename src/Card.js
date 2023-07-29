/** @format */

import React from "react";

const Card = ({ drawnCard }) => {
  return (
    <div className="card-display">
      {drawnCard ? (
        <img
          src={drawnCard.image}
          alt={drawnCard.code}
          className="drawn-card"
        />
      ) : (
        <p>No card drawn yet.</p>
      )}
    </div>
  );
};

export default Card;
