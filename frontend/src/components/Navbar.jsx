import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";
function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);


  const sendVerificationOtp = async ()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if(data.success){
        navigate('/email-verify');
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav class=" border-gray-200 fixed w-full z-50">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          {/* <img src={mysvg} className="w-2.5 h-auto absolute z-50" alt="" /> */}
          <span
            style={{ fontFamily: "Pacifico, cursive" }}
            class="self-center text-2xl whitespace-nowrap text-emerald-200 font-thin"
          >
            Loginwala
          </span>
        </div>
        {/* <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"> */}
        {userData ? (
          <div className="w-9 h-9 bg-pink-400 rounded-full flex justify-center items-center relative group hover:bg-pink-500">
            {userData.name[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded-2xl text-black pt-10">
              <ul className="list-none m-0 bg-pink-200 text-sm rounded-2xl overflow-hidden">
                {!userData.isAccountVerified && (
                  <li onClick={sendVerificationOtp} className="py-2 px-3 hover:bg-pink-300 cursor-pointer whitespace-nowrap">
                    Verify email
                  </li>
                )}
                <li onClick={logout} className="py-2 px-3 hover:bg-pink-300 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            type="button"
            class="text-zinc-600 font-mono font-bold hover:bg-pink-400 bg-pink-300 rounded-lg text-sm px-5 py-3 text-center cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
      {/* </div> */}
    </nav>
  );
}

export default Navbar;
