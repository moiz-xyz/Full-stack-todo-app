import List from "../../modal/ListsSchea.js";
import { listSchema } from "../../Valiadors/joilists.js";

export const CreateTodo = async (req, res) => {
  const { task, isCompleted } = req.body;

  try {
    await listSchema.validateAsync(req.body);

    const todoExists = await List.findOne({ task, user: req.user._id });
    if (todoExists) {
      return res.status(409).send({
        status: 409,
        message: "Todo already exists", 
      });
    }

    const createTodo = await List.create({
      task,
      isCompleted,
      user: req.user._id, 
    });

    return res.status(201).send({
      status: 201,
      message: "List created successfully",
      data: createTodo,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message || "Internal server error",
    });
  }
};
