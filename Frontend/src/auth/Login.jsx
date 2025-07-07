import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../Api/loginApi";

const Login = () => {
  const [form, setform] = useState({
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
       const res = await loginUser(form);
      //  console.log("Successfully Loged in:", res.token);
       const token = res.token;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Successfully Logged in:", token);
         navigate("/todo");
      }
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return (
    <>
    <form className="signup-wrapper"  onSubmit={handleSubmit}>
      <h2>Login</h2>
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
        Login
      </button>
    </form>
     </>
  );
};

export default Login;
