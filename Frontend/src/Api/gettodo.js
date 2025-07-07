import axios from "axios";
import axiosInstance from "../axioxInstance/axiosInstance";

const apiUrl = "http://localhost:3000/api/todo/getTodo" ; 

export const getList = async (userTodo) => {
  try {
    const resp = await axiosInstance.get(apiUrl , userTodo);
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};
