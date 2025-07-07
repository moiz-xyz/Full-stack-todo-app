import list from "../../modal/ListsSchea.js";

export const DeleteTodo = async (req, res) => {
  try {
    const { id } = req.params;           

    const todo = await list.findOne({
      _id: id,
      user: req.user._id,                
    });
//   console.log("Requested ID:", id);
// console.log("Logged-in User ID:", req.user._id);


    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found",
      });
    }

    await todo.deleteOne();               

    return res.status(200).json({
      status: 200,
      message: "Todo deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
