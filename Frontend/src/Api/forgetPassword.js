import axios from "axios";
import axiosInstance from "../axioxInstance/axiosInstance";

const apiUrl = "http://localhost:3000/" ; 

export const getOtp = async (usere,email) => {
  try {
    const resp = await axiosInstance.get(apiUrl , userTodo);
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};
