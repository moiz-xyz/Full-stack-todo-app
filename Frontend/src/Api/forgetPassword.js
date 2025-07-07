import axiosInstance from "../axioxInstance/axiosInstance";

const apiUrl = "http://localhost:3000/auth/generateOtp"
const apiUrl1 = "http://localhost:3000/auth/verify-reset-code"
const apiUrl2 = "http://localhost:3000/auth/reset-password"

export const getOtp = async (usermail) => {
  try {
    const resp = await axiosInstance.post(apiUrl , usermail)
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};

export const verifyotp = async ( req , res ) => {
  try {
    const resp = await axiosInstance.post(apiUrl1 , usermail)
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};


export const resetPassword = async (req , res ) => {
  try {
    const resp = await axiosInstance.post(apiUrl2 , usermail)
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};



