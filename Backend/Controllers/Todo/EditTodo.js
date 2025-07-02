import List from "../../modal/ListsSchea.js";

export const EditTodo = async (req, res) => {
  const { id } = req.params;        
  const updates = req.body;        
  try {

    const updatedTodo = await List.findOneAndUpdate(
      { _id: id, user: req.user._id }, 
      updates,
      {
        new: true,          
        runValidators: true 
      }
    );

    if (!updatedTodo) {
      return res.status(404).send({
        status: 404,
        message: "Todo not found",
      });
    }

    return res.status(200).send({
      status: 200,
      message: "Todo edited successfully",
      data: updatedTodo,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
