import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
function Login() {

  const navigate = useNavigate();

  const {backendUrl, setIsLoggedIn} = useContext(AppContext);


  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
   <div className="min-h-screen w-full relative flex items-center justify-center">
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
  {/*main content*/}
  <div onClick={()=> navigate('/')}  style={{ fontFamily: 'Pacifico, cursive' }} className="absolute top-4 left-4 text-emerald-400 hidden sm:block cursor-pointer">
    OAuth
  </div>
   <div  style={{
            background: 'linear-gradient(45deg, oklch(82.3% 0.12 346.018), oklch(80.9% 0.105 251.813))'
          }} className=" flex items-center justify-center flex-col w-xs rounded-2xl p-8 gap-3 relative z-50">
        <div className="text-2xl">
          {state === "Sign Up" ? <h1>Create Account</h1> : <h1>Login</h1>}
        </div>
        <div className="font-thin text-blue-950">
          {state === "Sign Up" ? (
            <h1>Create your account</h1>
          ) : (
            <h1>Login your account</h1>
          )}
        </div>

        <form>
        {state==='Sign Up' && (
          <div className="bg-pink-200 px-4 py-2 rounded-3xl flex justify-center items-center gap-1 mb-2">
            <i className="fa-solid fa-user text-slate-600"></i>
            <input
            onChange={(e)=> setName(e.target.value)}
            value={name}
              type="text"
              placeholder="Full Name"
              className="outline-none"
            />
          </div>
        )}
        
          <div className="bg-pink-200 px-4 py-2 rounded-3xl flex justify-center items-center gap-1 mb-2">
           <i className="fa-solid fa-envelope text-slate-600"></i>
            <input
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
              type="text"
              placeholder="Your Email"
              className="outline-none"
            />
          </div>
          <div className="bg-pink-200 px-4 py-2 rounded-3xl flex justify-center items-center gap-1 mb-2">
            <i className="fa-solid fa-lock  text-slate-600"></i>
            <input
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
              type="password"
              placeholder="Your Password"
              className="outline-none"
            />
          </div>
      <p onClick={navigate('/reset-password')} className="font-bold text-blue-900 relative left-[5%] text-xs cursor-pointer">forgot password?</p>

      <button className="bg-gradient-to-b from-blue-500 to-pink-500 px-3 py-2 rounded-4xl text-white m-2 w-60 hover:from-blue-900 ">{state}</button>

      </form>
      {state==='Sign Up'? ( <div className="text-sm">already have an account? {' '} <span className="text-blue-700 underline cursor-pointer" onClick={()=>setState("Login")}>Login here</span></div>
      ) : (<div className="text-sm">don't have an account? {' '} <span className="text-blue-700 underline cursor-pointer" onClick={()=>setState("Sign Up")}>Sign Up here</span></div>)}

    </div>
</div>
  );
}

export default Login;
