/** @format */

import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export const fetchNewDeck = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching new deck:", error);
    throw error;
  }
};

export const drawCard = async (deckId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${deckId}/draw/`);
    return response.data;
  } catch (error) {
    console.error("Error drawing card:", error);
    throw error;
  }
};

export const shuffleDeck = async (deckId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
    return response.data;
  } catch (error) {
    console.error("Error shuffling deck:", error);
    throw error;
  }
};
