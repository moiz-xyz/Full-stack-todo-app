import axios from "axios";

const apiUrl = "http://localhost:3000/api/todo/deleteTodo";

export const Deletelist = async (userTodo) => {
  try {
    const resp = await axios.delete(apiUrl , userTodo);
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};
