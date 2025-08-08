import React, { useState } from "react";

function Login() {
  const [state, setState] = useState("Sign Up");
  return (
    <div className="w-full h-screen bg-linear-to-r/increasing from-amber-300 to-amber-50 flex justify-center items-center flex-col">
      <div className="bg-amber-100 flex items-center justify-center flex-col w-xs rounded-2xl p-8 gap-3">
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

        {state=='Sign Up'? (
          <form>
          <div className="bg-slate-400 px-4 py-2 rounded-3xl flex justify-center items-center gap-1 mb-2">
            <i className="fa-solid fa-user text-slate-600"></i>
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none"
            />
          </div>
        </form>
        ) : (null)}
        
        <form>
          <div className="bg-slate-400 px-4 py-2 rounded-3xl flex justify-center items-center gap-1 mb-2">
           <i className="fa-solid fa-envelope text-slate-600"></i>
            <input
              type="text"
              placeholder="Your Email"
              className="outline-none"
            />
          </div>
        </form>
        <form>
          <div className="bg-slate-400 px-4 py-2 rounded-3xl flex justify-center items-center gap-1 mb-2">
            <i className="fa-solid fa-lock  text-slate-600"></i>
            <input
              type="password"
              placeholder="Your Password"
              className="outline-none"
            />
          </div>
        </form>

      <p className="font-bold text-blue-900 relative left-[-23%] text-xs cursor-pointer">forgot password?</p>

      <button className="bg-linear-to-r from-slate-500 to-blue-500 px-3 py-2 rounded-4xl text-amber-100 m-2 w-60">{state}</button>

      {state==='Sign Up'? ( <div className="text-sm">already have an account? {' '} <span className="text-blue-700 underline cursor-pointer" onClick={()=>setState("Login")}>Login here</span></div>
      ) : (<div className="text-sm">don't have an account? {' '} <span className="text-blue-700 underline cursor-pointer" onClick={()=>setState("Sign Up")}>Sign Up here</span></div>)}

    </div>
    </div>
  );
}

export default Login;
