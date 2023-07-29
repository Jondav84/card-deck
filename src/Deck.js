/** @format */

import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { fetchNewDeck, drawCard, shuffleDeck } from "./Services";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [drawnCard, setDrawnCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [message, setMessage] = useState("");

  const intervalRef = useRef(null);

  useEffect(() => {
    async function initializeDeck() {
      const data = await fetchNewDeck();
      setDeck(data);
      setDrawnCard(null);
      setIsDrawing(false);
    }
    initializeDeck();
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const drawNextCard = async () => {
    if (!deck) return;

    const data = await drawCard(deck.deck_id);
    setDeck(data);

    if (data.cards.length > 0) {
      setDrawnCard(data.cards[0]);
    } else {
      setIsDrawing(false);
      clearInterval(intervalRef.current);
      setMessage("No cards remaining in the deck.");
    }
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setMessage("");
    drawNextCard();
    intervalRef.current = setInterval(drawNextCard, 1000);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    clearInterval(intervalRef.current);
  };

  const handleToggleDraw = () => {
    if (isDrawing) {
      stopDrawing();
    } else {
      startDrawing();
    }
  };

  const handleShuffleDeck = async () => {
    if (!deck) return;

    stopDrawing();
    await shuffleDeck(deck.deck_id);
    setDrawnCard(null);
    setMessage("");
  };

  return (
    <div className="deck-container">
      <div className="card-display">
        <Card drawnCard={drawnCard} />
      </div>
      <div className="buttons-container">
        <button
          className="Deck-gimme"
          onClick={handleToggleDraw}
          disabled={deck?.remaining === 0}
        >
          {isDrawing ? "Stop Drawing" : "Start Drawing"}
        </button>
        <button
          className="Deck-gimme"
          onClick={handleShuffleDeck}
          disabled={isDrawing}
        >
          Shuffle Deck
        </button>
      </div>
      <div className="message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Deck;
