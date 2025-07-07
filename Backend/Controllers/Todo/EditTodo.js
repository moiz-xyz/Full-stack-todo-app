import List from "../../modal/ListsSchea.js";

export const EditTodo = async (req, res) => {
  try {
    const { id } = req.params;
 const { task, isCompleted } = req.body;
   
    const todo = await List.findOneAndUpdate(
      { _id: id, 
        user: req.user._id },
      { task , isCompleted } , 
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Todo updated successfully!",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
