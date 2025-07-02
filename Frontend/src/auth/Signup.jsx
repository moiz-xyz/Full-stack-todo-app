import { useState } from "react";
import { signupUser } from "../Api/signupApi";

const Signup = () => {
  const [form, setform] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
console.log("Success:", form);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
        const res = await signupUser(form);
      console.log("Successfully signed up:", res);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return (
    <>
      <form className="signup-wrapper" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <div className="name">
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

        <div className="username">
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
          />
        </div>

        <div className="email">
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            onChange={handleChange}
          />
        </div>

        <div className="password">
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Sign-Up
        </button>
      </form>
    </>
  );
};

export default Signup;
