import React from "react";
import {useNavigate} from 'react-router-dom';
import mysvg from '../assets/svg.svg';
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav class=" border-gray-200 fixed w-full z-50">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          {/* <img src={mysvg} className="w-2.5 h-auto absolute z-50" alt="" /> */}
          <span style={{ fontFamily: 'Pacifico, cursive' }} class="self-center text-2xl whitespace-nowrap text-emerald-200 font-thin">
            OAuth
          </span>
        </div>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
          onClick={()=>navigate('/login')}
            type="button"
            class="text-zinc-600 font-mono font-bold hover:bg-pink-400 bg-pink-300 rounded-lg text-sm px-5 py-3 text-center cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
