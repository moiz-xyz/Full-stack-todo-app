import { useState } from "react";
import { signupUser } from "../Api/signupApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setform] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
const navigate = useNavigate(); 
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(form);
      console.log("Successfully signed up:", res);
      setform({
        name: "",
        username: "",
        email: "",
        password: "",
      });
       navigate("/login");     
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <form className="signup-wrapper" onSubmit={handleSubmit}>
      <h2>Create an account</h2>

      <div className="name">
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="username">
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div className="email">
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="password">
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Sign-Up</button>
    </form>
  );
};

export default Signup;
