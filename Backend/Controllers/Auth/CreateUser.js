import User from "../../modal/UserSchema.js" ;
import bcrypt from "bcrypt"
import { signupSchema } from "../../Valiadors/joi.js";

export const CreateUser = async (req, res) => {
  try {
    await signupSchema.validateAsync(req.body);

    const { name, username, email, password } = req.body;

    const exists = await User.findOne ({ email });
    if (exists) {
      return res.status(409).json({ status: 409, message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hash,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: userObj,
    });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ status: 400, message: err.message });
    }
    return res.status(500).json({ status: 500, message: err.message });
  }
};
