import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import axios from 'axios';
import {toast} from 'react-toastify';
function Login() {

  const navigate = useNavigate();

  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);


  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmitHandler = async (e)=>{
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if( state === 'Sign Up'){
        const {data}= await axios.post(backendUrl + '/api/auth/register',{name,email,password});

        if(data.success){
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        }else{
          toast.error(data.message);
        }
      }else{
        const {data}= await axios.post(backendUrl + '/api/auth/login',{email,password});

        if(data.success){
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        }else{
          toast.error("data not found");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
   <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-6">
  {/* Aurora Dream Corner Whispers */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
        radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
        radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
        radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
    }}
  />
  
  <div 
    onClick={() => navigate('/')} 
    style={{ fontFamily: 'Pacifico, cursive' }} 
    className="absolute top-4 left-4 text-emerald-400 text-lg sm:text-xl cursor-pointer z-50"
  >
    Loginwala
  </div>
  
  <div className="bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center flex-col w-full max-w-sm sm:max-w-md rounded-2xl p-6 sm:p-8 gap-3 relative z-50 mx-4 shadow-lg">
    
    <div className="text-xl sm:text-2xl text-center">
      {state === "Sign Up" ? <h1>Create Account</h1> : <h1>Login</h1>}
    </div>
    
    <div className="font-thin text-blue-950 text-sm sm:text-base text-center">
      {state === "Sign Up" ? (
        <h1>Create your account</h1>
      ) : (
        <h1>Login your account</h1>
      )}
    </div>

    <form onSubmit={onSubmitHandler} className="w-full space-y-3">
      
      {state === 'Sign Up' && (
        <div className="bg-pink-200 px-4 py-3 rounded-3xl flex items-center gap-3 w-full">
          <i className="fa-solid fa-user text-slate-600 flex-shrink-0"></i>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            className="outline-none bg-transparent flex-1 text-sm sm:text-base"
            required
          />
        </div>
      )}
     
      <div className="bg-pink-200 px-4 py-3 rounded-3xl flex items-center gap-3 w-full">
        <i className="fa-solid fa-envelope text-slate-600 flex-shrink-0"></i>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Your Email"
          className="outline-none bg-transparent flex-1 text-sm sm:text-base"
          required
        />
      </div>
      
      <div className="bg-pink-200 px-4 py-3 rounded-3xl flex items-center gap-3 w-full">
        <i className="fa-solid fa-lock text-slate-600 flex-shrink-0"></i>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Your Password"
          className="outline-none bg-transparent flex-1 text-sm sm:text-base"
          required
        />
      </div>
      
      <div className="flex justify-end w-full">
        <p 
          onClick={() => navigate('/reset-password')} 
          className="font-bold text-blue-900 text-xs sm:text-sm cursor-pointer hover:underline"
        >
          forgot password?
        </p>
      </div>
      
      <button 
        type="submit"
        className="bg-pink-50 px-4 py-3 rounded-full text-[#121212] w-full hover:bg-pink-100 cursor-pointer transition-colors duration-200 text-sm sm:text-base font-medium mt-4"
      >
        {state}
      </button>
    </form>
    
    <div className="text-xs sm:text-sm text-center mt-2 px-2">
      {state === 'Sign Up' ? (
        <div>
          Already have an account?{' '}
          <span 
            className="text-blue-700 underline cursor-pointer hover:text-blue-800" 
            onClick={() => setState("Login")}
          >
            Login here
          </span>
        </div>
      ) : (
        <div>
          Don't have an account?{' '}
          <span 
            className="text-blue-700 underline cursor-pointer hover:text-blue-800" 
            onClick={() => setState("Sign Up")}
          >
            Sign up here
          </span>
        </div>
      )}
    </div>
  </div>
</div>
  );
}

export default Login;
