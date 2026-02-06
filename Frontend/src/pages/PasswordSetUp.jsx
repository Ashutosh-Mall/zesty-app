import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const PasswordSetUp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/auth/sendotp`,
        { email },
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/auth/verifyotp`,
        { email, otp },
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    }
  };

  const resetPassword = async () => {
    if (password !== confirmPass) {
      return setMessage("Passwords do not match!");
    }

    try {
      const res = await axios.post(
        `${apiUrl}/api/auth/resetpassword`,
        { email, password },
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Reset Password
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={sendOtp}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition"
          >
            Send OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition"
          >
            Verify OTP
          </button>

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={resetPassword}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition"
          >
            Reset Password
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-orange-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordSetUp;
