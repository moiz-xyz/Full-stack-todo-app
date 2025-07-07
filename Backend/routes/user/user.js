import express from "express"
import { CreateUser, Loginuser } from "../../Controllers/main.js";
import { generateOtp, resetPassword, verifyResetCode } from "../../Controllers/Auth/forgotPassword.js";

const router = express.Router();
router.post("/signup", CreateUser)
router.post("/login", Loginuser)

router.post("/generateOtp", generateOtp);
router.post("verify-reset-code", verifyResetCode);
router.put("/reset-password",  resetPassword);

export default router