import { useState } from "react";
import { Alert, Spin } from "antd";
import { resetPassword } from "../Api/forgetPassword";

export default function ResetPassword({ onVerify }) {
  const [form, setForm] = useState({ password: "", confirm: "" });

  const [errorMsg, setErrorMsg]   = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading]     = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const clearForm = () => setForm({ password: "", confirm: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (form.password !== form.confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ password: form.password });       
      clearForm();
      setSuccessMsg("Password updated! Redirecting…");

      setTimeout(() => onVerify?.(), 1000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Password reset failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-wrapper">
      <form className="fp-card" onSubmit={handleSubmit}>
        <h2 className="fp-title">Reset Password</h2>

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

        <p className="fp-help">Enter the new password for your account.</p>

        <input
          type="password"
          name="password"
          className="fp-input"
          placeholder="Enter new password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirm"
          className="fp-input"
          placeholder="Confirm new password"
          value={form.confirm}
          onChange={handleChange}
          required
        />

        <button className="fp-btn" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spin size="small" /> &nbsp;Saving…
            </>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}
