import { baseUrl } from "@/utils/config";
import axios from "axios";

const authServices = {};

authServices.login = async (loginData) => {
  try {
    // Make the POST request for login
    const response = await axios.post(`${baseUrl}/auth/login`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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

authServices.getUserProfile = async () => {
  try {
    let url = `${baseUrl}/api/v1/users/current-user`;
    const accessToken = Cookies.get("accessToken");
    //const refreshToken = Cookies.get("refreshToken");
    let config = {
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let res = await axios(config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("err: ", err?.response);
      });
    return res;
  } catch (error) {
    console.error("Error fetching registered players:", error);
    throw error;
  }
};

export default authServices;
