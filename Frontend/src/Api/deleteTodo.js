import axiosInstance from "../axioxInstance/axiosInstance";
export const Deletelist = async (id) => {
  try {
    const resp = await axiosInstance.delete(`/todo/deleteTodo/${id}`);
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Delete failed";
    throw new Error(message);
  }
};
