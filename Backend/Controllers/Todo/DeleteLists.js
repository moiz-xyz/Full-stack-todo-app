import list from "../../modal/ListsSchea.js";

export const DeleteTodo = async (req, res) => {
  try {
    const getdeleteTodo = await list.findOne({ title: req.query.title });

    if (!getdeleteTodo) {
      return res.status(404).send({
        status: 404,
        message: "Todo not found",
      });
    }

    await getdeleteTodo.deleteOne();

    return res.status(200).send({
      status: 200,
      message: "Todo deleted successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
