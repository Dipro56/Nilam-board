import { baseUrl } from "@/utils/config";
import axios from "axios";
import Cookies from "js-cookie";

const playerService = {};

playerService.updatePlayer = async (playerId, playerData) => {
  try {
    // Make the POST request for login
    const accessToken = Cookies.get("accessToken");

    const response = await axios.put(
      `${baseUrl}/player/${playerId}`,
      playerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    // Log the error for debugging
    console.error("Login Error:", error.response || error.message);

    // Return a user-friendly error message
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

playerService.deletePlayer = async (playerId) => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.delete(`${baseUrl}/player/${playerId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Delete Error:", error.response || error.message);

    throw new Error(
      error.response?.data?.message || "Delete failed. Please try again."
    );
  }
};

export default playerService;
