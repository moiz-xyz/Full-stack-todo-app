import { useState } from 'react';

export default function ForgotPassword({ onVerify }) {
  const [email, setemail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!phone.trim()) return;
    onVerify?.(phone);     
    setemail('');
  };

  return (
    <div className="fp-wrapper">
      <form className="fp-card" onSubmit={handleSubmit}>
        <h2 className="fp-title">Forgot Password</h2>

        <p className="fp-help">
          Enter the email address linked to your account. We'll send you a onetime password &nbsp;(OTP)
        </p>

        <input
          type="tel"
          className="fp-input"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setemail(e.target.value)}
          required
        />

        <button className="fp-btn" type="submit">Verify</button>
      </form>
    </div>
  );
}