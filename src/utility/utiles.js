import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = (token) => {
  try {
    // Decode the token to get the payload
    if (token !== null || undefined || "") {
      const decoded = jwtDecode(token);
      // Return the user ID
      return decoded.id;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};