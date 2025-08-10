import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";

function Header() {
  const {userData} = useContext(AppContext);

  return (
    <div className="bg-[#fefcff] relative flex justify-center items-center w-full min-h-screen overflow-hidden flex-col text-center px-4 gap-3.5">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      <h1 className=" font-bold text-[15vw] tracking-tight leading-tight bg-clip-text text-transparent bg-linear-65 from-purple-500 to-pink-500 ">
        <span style={{ fontFamily: "Pacifico, cursive" }}>Hello </span>
        <span className="relative inline-flex sm:inline">
          <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0 z-10 rounded-4xl"></span>
          <span className="relative z-30 text-white"> {userData ? userData.name : "Dev."}</span>
        </span>
      </h1>
      <p className="font-light flex justify-center items-center">
        Connecting developers. Creating solutions.
      </p>
      <button className="relative bg-[#121212] p-4 cursor-pointer rounded-2xl hover:bg-black transition-colors duration-75 font-mono text-amber-50 z-40 overflow-visible">
  <span className="relative z-10">Get Started</span>
  <div className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent z-0 pointer-events-none"></div>
</button>
    </div>
  );
}

export default Header;
