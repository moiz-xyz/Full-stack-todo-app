import { useState } from "react";
import { Alert, Spin } from "antd";
import { getOtp } from "../Api/forgetPassword";

export default function ForgotPassword({ onVerify }) {
  const [email, setEmail]     = useState("");
  const [errorMsg, setErrorMsg]   = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await getOtp({ email }); 
      setSuccessMsg("OTP sent! Check your inbox…");

      setTimeout(() => onVerify?.(email), 1000);
      setEmail("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Could not send OTP. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-wrapper">
      <form className="fp-card" onSubmit={handleSubmit}>
        <h2 className="fp-title">Forgot Password</h2>

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

        <p className="fp-help">
          Enter the email address linked to your account. We’ll send you a one‑time
          password (OTP).
        </p>

        <input
          type="email"
          className="fp-input"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="fp-btn" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spin size="small" /> &nbsp;Sending…
            </>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
}
