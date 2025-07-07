import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Api/loginApi";
import { Alert, Spin } from "antd";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const { token } = await loginUser(form);

      if (!token) throw new Error("Token not returned from server.");

      localStorage.setItem("authToken", token);
      setSuccessMsg("Login successful! Redirecting …");

      setTimeout(() => navigate("/todo"), 1000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-wrapper" onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <div className="email">
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          onChange={handleChange}
          required
        />
      </div>

      <div className="password">
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spin size="small" /> &nbsp;Logging in…
          </>
        ) : (
          "Login"
        )}
      </button>

      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
      <p className="auth-switch">
        <Link to="/forgotPassword">Forget password</Link>
      </p>
    </form>
  );
};

export default Login;
