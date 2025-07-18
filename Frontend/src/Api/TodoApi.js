import axiosInstance from "../axioxInstance/axiosInstance";

const apiUrl = "http://localhost:3000/api/todo/CreateTodo";

export const Addlist = async (task) => {
  try {
    const resp = await axiosInstance.post(apiUrl , {task});
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};
