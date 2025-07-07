
import jwt from "jsonwebtoken";
import transporter from "../../Transporter/Transporter.js";
import User from "../../modal/UserSchema.js";

export const generateOtp = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      message: "No user found with that email",
    });
  }

  const otp = otpGenerate();                   

  user.resetOtpHash   = await hashValue(otp);
  user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; 
  user.resetVerified  = false;
  await user.save();

  await transporter.sendMail({
    from: "info@gmail.com",
    to: email,
    subject: "Your password reset code",
    text: `Your password reset code is ${otp}. It expires in 10 minutes.`,
  });

  return res.json({
    message: "If that e-mail exists, a code has been sent.",
  });
};

export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });      
  if (
    !user ||
    !user.resetOtpHash ||
    user.resetOtpExpiry < Date.now() ||
    !(await compareHash(code, user.resetOtpHash))
  ) {
    return res.status(400).json({ error: "Invalid or expired code." });
  }

  user.resetVerified = true;
  await user.save();

  const resetToken = jwt.sign(
    { id: user._id, purpose: "password_reset" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ resetToken });
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  let payload;
  try {
    payload = jwt.verify(resetToken, process.env.JWT_SECRET);
    if (payload.purpose !== "password_reset") throw new Error();
  } catch {
    return res.status(401).json({ error: "Invalid or expired reset token." });
  }

  const user = await User.findById(payload.id);    
  if (!user || !user.resetVerified) {
    return res.status(403).json({ error: "Reset not verified." });
  }

  user.password       = await hashValue(newPassword);
  user.resetOtpHash   = undefined;
  user.resetOtpExpiry = undefined;
  user.resetVerified  = false;
  await user.save();                               

  res.json({ message: "Password updated successfully." });
};
