import express from "express"
import { CreateUser, Loginuser } from "../../Controllers/main.js";

const router = express.Router();
router.post("/signup", CreateUser)
router.post("/login", Loginuser)

export default router