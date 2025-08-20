import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext";
function EmailVerify() {
  const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
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

  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split('');
    pasteArray.forEach((ch, index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = ch;
      }
    });
  }

  const onSubmitHandler = async (e)=>{
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');
      
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp})

      if(data.success){
        toast.success(data.message);
        await getUserData();
        navigate('/');
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const sendVerificationOtp = async ()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
   isLoggedIn && userData && userData?.isAccountVerified && navigate('/')
  },[isLoggedIn,userData])

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-200 to-pink-200 flex justify-center items-center px-4 py-6">
  {/* Logo - Now visible on all screen sizes */}
  <div
    onClick={() => navigate("/")}
    style={{ fontFamily: "Pacifico, cursive" }}
    className="absolute top-4 left-4 text-emerald-400 text-lg sm:text-xl cursor-pointer z-10"
  >
    OAuth
  </div>
  
  {/* Main form container - Responsive width and padding */}
  <form 
    onSubmit={onSubmitHandler} 
    className="flex justify-center items-center text-center flex-col bg-slate-900 text-white p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md mx-4 shadow-lg"
  >
    {/* Header - Responsive text sizes */}
    <h1 className="font-semibold text-xl sm:text-2xl mb-4">Verify OTP</h1>
    
    {/* Description - Responsive text and spacing */}
    <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-300 leading-relaxed px-2">
      Enter the 6 digit code sent to your email address.
    </p>
    
    {/* OTP input container - Responsive spacing and sizing */}
    <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center" onPaste={handlePaste}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <input
            type="text"
            maxLength="1"
            key={index}
            required
            className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 text-lg sm:text-xl text-center rounded-md border-2 border-slate-700 focus:border-blue-500 focus:outline-none transition-colors duration-200"
            ref={(e) => (inputRefs.current[index] = e)}
            onInput={(e) => onInputHandler(e, index)}
            onKeyDown={(e) => onInputHandlerKeyDown(e, index)}
          />
        ))}
    </div>
    
    {/* Submit button - Full width with responsive styling */}
    <button 
      type="submit"
      className="w-full bg-blue-800 hover:bg-blue-700 py-3 sm:py-4 text-white rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 active:transform active:scale-95"
    >
      Verify Email
    </button>
    
    {/* Optional: Resend code section */}
    <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400">
      Didn't receive the code?{' '}
      <span className="text-blue-400 cursor-pointer hover:text-blue-300 underline" onClick={sendVerificationOtp}>
        Resend
      </span>
    </div>
  </form>
</div>
  );
}

export default EmailVerify;
