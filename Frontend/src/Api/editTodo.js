import axios from "axios";

const apiUrl = "http://localhost:3000/api/todo/EditTodo";

export const Editlist = async (userTodo) => {
  try {
    const resp = await axios.patch(apiUrl , userTodo);
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};
