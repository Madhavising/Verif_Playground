import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../api";

export const isTokenValid = (token) => {
  try {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const getUserDetails = async (token) => {
  try {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    let { data } = await axios.get(
      `${baseUrl}/api/auth/getUserById/${decodedToken.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { user: data };
  } catch (error) {
    return false;
  }
};
