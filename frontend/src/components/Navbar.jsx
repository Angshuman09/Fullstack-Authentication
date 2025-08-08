import React from "react";
import {useNavigate} from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav class=" border-gray-200 bg-[#F5DF4D] fixed w-full">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-zinc-900">
            OAuth
          </span>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
          onClick={()=>navigate('/login')}
            type="button"
            class="text-zinc-600 font-mono font-bold hover:bg-pink-400 bg-pink-300 rounded-lg text-sm px-5 py-3 text-center"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
