import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext";
function EmailVerify() {
  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContext);

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

  useEffect(()=>{
   isLoggedIn && userData && userData?.isAccountVerified && navigate('/')
  },[isLoggedIn,userData])

  return (
    <div className="w-full min-h-screen bg-linear-to-r from-blue-200 to-pink-200 flex justify-center items-center">
      <div
        onClick={() => navigate("/")}
        style={{ fontFamily: "Pacifico, cursive" }}
        className="absolute top-4 left-4 text-emerald-400 hidden sm:block cursor-pointer"
      >
        OAuth
      </div>
      <form onSubmit={onSubmitHandler} className="flex justify-center items-center text-center flex-col bg-slate-900 text-white p-4 rounded-2xl w-96">
        <h1 className="font-semibold text-2xl mb-4">Verify OTP</h1>
        <p className="mb-4">Enter the 6 digit code send to your email id.</p>
        <div className="flex gap-1 mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-slate-800 text-xl text-center rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => onInputHandler(e, index)}
                onKeyDown={(e) => onInputHandlerKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full bg-blue-800 py-3 text-white rounded-3xl font-semibold">
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify;
