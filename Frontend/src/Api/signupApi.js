import axios from "axios";

const apiUrl = "http://localhost:3000/api/auth/signup";

export const signupUser = async (userData) => {
  try {
    const resp = await axios.post(apiUrl, userData);
    return resp.data
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};
