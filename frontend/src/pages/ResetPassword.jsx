import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import email from '../assets/mail.svg'
import password from '../assets/password.svg'
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';
import axios from 'axios';
function ResetPassword() {
  const navigate= useNavigate();
  const [Email, setEmail] = useState('');
  const {newPassword,setNewPassword} = useState('');
  const {isEmailSend, setIsEmailSend} = useState(false);
  const {otp, setOtp} = new useState(0);
  const {isOtpSubmited, setIsOtpSubmited} = useState(false);

  const {backendUrl}= useContext(AppContext);

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

    const onSubmitEmail = async (e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl+'/api/auth/send-reset-otp',{Email});
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && setIsEmailSend(true);
      } catch (error) {
        toast.error(error.message);
      }
    }

  return (
     <div className="w-full min-h-screen bg-linear-to-r from-blue-200 to-pink-200 flex justify-center items-center">
      {/*enter email id*/}
      <div
        onClick={() => navigate("/")}
        style={{ fontFamily: "Pacifico, cursive" }}
        className="absolute top-4 left-4 text-emerald-400 hidden sm:block cursor-pointer"
      >
        OAuth
      </div>

      {!isEmailSend && 
      <form onSubmit={onSubmitEmail} className="flex justify-center items-center text-center flex-col bg-slate-900 text-white p-4 rounded-2xl w-96">
        <h1 className="font-semibold text-2xl mb-4">Reset Password</h1>
        <p className="mb-4">Enter your registered email address</p>
        <div className='flex items-center gap-2 bg-slate-800 p-2 w-full rounded-3xl mb-4'>
        <img src={email} alt="email-icon" className='w-5 h-5' />
        <input value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" className='outline-none bg-transparent' placeholder='Email id' required/>
        </div>
        <button className='bg-blue-500 p-2 rounded-3xl w-full hover:bg-blue-600 cursor-pointer'>Submit</button>
      </form>
      }

      {/*send otp*/}
      {isEmailSend && !isOtpSubmited &&
       <form className="flex justify-center items-center text-center flex-col bg-slate-900 text-white p-4 rounded-2xl w-96">
        <h1 className="font-semibold text-2xl mb-4">Reset password OTP</h1>
        <p className="mb-4">Enter the 6 digit code send to your email id.</p>
        <div className="flex gap-1 mb-7" onPaste={handlePaste}>
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
        <button className="w-full bg-blue-500 py-3 text-white rounded-3xl font-semibold hover:bg-blue-600 cursor-pointer">
          Submit
        </button>
      </form>
      }

      {/*Enter your new password*/}

      {isEmailSend && isOtpSubmited &&
        <form className="flex justify-center items-center text-center flex-col bg-slate-900 text-white p-4 rounded-2xl w-96">
        <h1 className="font-semibold text-2xl mb-4">New Password</h1>
        <p className="mb-4">Enter your new password</p>
        <div className='flex items-center gap-2 bg-slate-800 p-2 w-full rounded-3xl mb-4'>
        <img src={password} alt="email-icon" className='w-5 h-5' />
        <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type="password" className='outline-none bg-transparent' placeholder='New Password' required/>
        </div>
        <button className='bg-blue-500 p-2 rounded-3xl w-full hover:bg-blue-600 cursor-pointer'>Submit</button>
      </form>
      }
    </div>
  )
}

export default ResetPassword