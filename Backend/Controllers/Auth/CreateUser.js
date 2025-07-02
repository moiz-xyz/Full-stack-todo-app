import User from "../../modal/UserSchema.js";
import { signupSchema } from "../../Valiadors/joi.js";
import bcrypt from "bcrypt"

export const CreateUser = async (req, res) => {
  const { name , username, email, password } = req.body;

  try {
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res.status(409).send({
        status: 409,
        message: "User already exists",
      });
    }

    await signupSchema.validateAsync(req.body);
   const password_in_Hash = await bcrypt.hash(password, 10);

     const createUser = await User.create({
      name,
      username,
      email,
      password: password_in_Hash,
    })
    return res.status(201).send({
        status: 201,
        message: "User created successfully",
    });

  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message || "Internal server error",
    });
  }
};

