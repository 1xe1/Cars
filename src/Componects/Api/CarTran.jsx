// Api/CarTran.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8081/CarTran"; // Change this URL to your API's base URL

export const makeReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reserve`, reservationData);
    return response.data; // You can return the response data if needed
  } catch (error) {
    throw error; // Rethrow the error to be caught and handled by the calling component
  }
};
