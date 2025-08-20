import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import email from "../assets/email.svg";
import password from "../assets/password.svg";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";
function ResetPassword() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const inputRefs = useRef([]);

  const onInputHandler = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const onInputHandlerKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((ch, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = ch;
      }
    });
  };

  const onSubmitEmail = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      backendUrl + "/api/auth/send-reset-otp",
      { email: Email }
    );

    if (data.success) {
      toast.success(data.message);
      setIsEmailSend(true);
    } else {
      toast.error(data.message || "User not exist");
    }
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(message);
  }
};


  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const finalOtp = otpArray.join("");
    setOtp(finalOtp);
    setIsOtpSubmited(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email: Email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-200 to-pink-200 flex justify-center items-center px-4 py-6">
  {/* Logo - Now visible on all screen sizes */}
  <div
    onClick={() => navigate("/")}
    style={{ fontFamily: "Pacifico, cursive" }}
    className="absolute top-4 left-4 text-emerald-400 text-lg sm:text-xl cursor-pointer z-10"
  >
    Loginwala
  </div>

  {/* Step 1: Enter Email */}
  {!isEmailSend && (
    <form
      onSubmit={onSubmitEmail}
      className="flex justify-center items-center text-center flex-col bg-gradient-to-br from-pink-300 to-purple-400 text-slate-900 p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md mx-4 shadow-lg"
    >
      <h1 className="font-semibold text-xl sm:text-2xl mb-4">Reset Password</h1>
      <p className="mb-6 text-sm sm:text-base text-gray-700 leading-relaxed">
        Enter your registered email address
      </p>
      
      {/* Email input*/}
      <div className="flex items-center gap-3 bg-pink-200 p-3 sm:p-4 w-full rounded-full mb-6 border-2 border-pink-400 focus-within:border-pink-900 transition-colors duration-200">
        <img src={email} alt="email-icon" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <input
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="outline-none bg-transparent w-full text-sm sm:text-base placeholder-gray-400"
          placeholder="Email address"
          required
        />
      </div>
      
      <button 
        type="submit"
        className="bg-white hover:bg-pink-100 py-3 sm:py-4 px-6 rounded-full w-full font-semibold text-sm sm:text-base transition-colors duration-200 active:transform active:scale-95"
      >
        Send Reset Code
      </button>
    </form>
  )}

  {/* Enter OTP */}
  {isEmailSend && !isOtpSubmited && (
    <form
      onSubmit={onSubmitOTP}
      className="flex justify-center items-center text-center flex-col bg-gradient-to-br from-pink-300 to-purple-400 text-slate-800 p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md mx-4 shadow-lg"
    >
      <h1 className="font-semibold text-xl sm:text-2xl mb-4">Reset Password OTP</h1>
      <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-700 leading-relaxed px-2">
        Enter the 6 digit code sent to your email address.
      </p>
      
      {/* OTP input fields with responsive sizing */}
      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center" onPaste={handlePaste}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-200 text-lg sm:text-xl text-center rounded-md border-2 border-pink-400 focus:border-pink-800 focus:outline-none transition-colors duration-200"
              ref={(e) => (inputRefs.current[index] = e)}
              onInput={(e) => onInputHandler(e, index)}
              onKeyDown={(e) => onInputHandlerKeyDown(e, index)}
            />
          ))}
      </div>
      
      <button 
        type="submit"
        className="w-full bg-white hover:bg-pink-100 py-3 sm:py-4 text-slate-800 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 active:transform active:scale-95"
      >
        Verify Code
      </button>
      
      {/* Back to email step */}
      <button 
        type="button"
        onClick={() => setIsEmailSend(false)}
        className="mt-4 text-xs sm:text-sm text-gray-700 hover:text-gray-900 underline"
      >
        ← Back to email
      </button>
    </form>
  )}

  {/* Enter New Password */}
  {isEmailSend && isOtpSubmited && (
    <form
      onSubmit={onSubmitNewPassword}
      className="flex justify-center items-center text-center flex-col bg-gradient-to-br from-pink-300 to-purple-400 text-slate-700 p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md mx-4 shadow-lg"
    >
      <h1 className="font-semibold text-xl sm:text-2xl mb-4">New Password</h1>
      <p className="mb-6 text-sm sm:text-base text-gray-700 leading-relaxed">
        Enter your new password
      </p>
      
      {/* Password input with responsive styling */}
      <div className="flex items-center gap-3 bg-pink-200 p-3 sm:p-4 w-full rounded-full mb-6 border-2 border-pink-400 focus-within:border-pink-700 transition-colors duration-200">
        <img src={password} alt="password-icon" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          className="outline-none bg-transparent w-full text-sm sm:text-base placeholder-slate-700"
          placeholder="New Password"
          required
          minLength="8"
        />
      </div>
      
      <button 
        type="submit"
        className="bg-white hover:bg-pink-100 py-3 sm:py-4 px-6 rounded-full w-full font-semibold text-sm sm:text-base transition-colors duration-200 active:transform active:scale-95"
      >
        Reset Password
      </button>
      
      {/* Progress indicator */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className="text-xs text-gray-800 ml-2">Step 3 of 3</span>
      </div>
    </form>
  )}
</div>
  );
}

export default ResetPassword;
