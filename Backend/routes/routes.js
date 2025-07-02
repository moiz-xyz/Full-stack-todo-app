import express from "express"
import UserAuth from "./user/user.js"
import UserTodo from "./Todo/todo.js"

const router = express.Router();

router.use("/auth" , UserAuth)
router.use("/todo" ,UserTodo )

export default router