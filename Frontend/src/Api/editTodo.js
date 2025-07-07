import axiosInstance from "../axioxInstance/axiosInstance";

/**
 * @param {string} id    
 * @param {object} data  
 */
export const Editlist = async (id, data) => {
  try {
    const resp = await axiosInstance.patch(`/todo/EditTodo/${id}`, data);
    return resp.data;
  } catch (error) {
    const message = error.response?.data?.message || "Edit failed";
    throw new Error(message);
  }
};
