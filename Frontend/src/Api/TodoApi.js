import axios from "axios";

const apiUrl = "http://localhost:3000/api/todo/CreateTodo";

export const Addlist = async (userTodo) => {
  try {
    const resp = await axios.post(apiUrl , userTodo);
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};
