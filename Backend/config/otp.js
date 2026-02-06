import nodemailer from 'nodemailer'
import generateOTP from '../utils/genrateOtp.js'
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendOtpMail = async (email) => {
  const otp = generateOTP();
  await transporter.sendMail({
    from: `"Zesty" <${process.env.EMAIL}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `<h2>Your OTP: ${otp}</h2><p>Valid for 5 minutes</p><p>Welcome to Zesty</p>`,
  });

  return otp;
};
