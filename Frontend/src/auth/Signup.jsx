import { useState } from "react";
import { signupUser } from "../Api/signupApi";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spin } from "antd";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg]   = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading]     = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () =>
    setForm({ name: "", username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await signupUser(form);          // call API
      resetForm();                     // clear inputs
      setSuccessMsg("Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-wrapper" onSubmit={handleSubmit}>
      <h2>Create an account</h2>

      {errorMsg && (
        <Alert
          type="error"
          message="Error"
          description={errorMsg}
          showIcon
          closable
          onClose={() => setErrorMsg(null)}
          style={{ marginBottom: 16 }}
        />
      )}

      {successMsg && (
        <Alert
          type="success"
          message={successMsg}
          showIcon
          closable
          onClose={() => setSuccessMsg(null)}
          style={{ marginBottom: 16 }}
        />
      )}

      <div className="name">
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="username">
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="email">
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="password">
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spin size="small" /> &nbsp;Signing up…
          </>
        ) : (
          "Sign‑Up"
        )}
      </button>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
