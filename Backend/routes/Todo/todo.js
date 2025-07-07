import express from "express";
import {
  CreateTodo,
  DeleteTodo,
  EditTodo,
  GetAllTodo,
} from "../../Controllers/main.js";
import verifytoken from "../../MiddleWare.js/verifytoken.js";

const router = express.Router();

router.post("/createTodo", verifytoken, CreateTodo);

router.get("/getTodo",verifytoken ,GetAllTodo);

router.delete("/deleteTodo/:id", verifytoken, DeleteTodo);

router.patch("/editTodo/:id", verifytoken, EditTodo);

export default router;
