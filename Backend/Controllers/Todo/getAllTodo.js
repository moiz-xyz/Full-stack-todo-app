import list from "../../modal/ListsSchea.js";

export const GetAllTodo = async (req, res) => {
  try {
    const getTodo = await list.find({ user: req.user._id });

    return res.status(200).send({
      status: 200,
      message: "User's todos retrieved successfully!",
      data: getTodo,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
