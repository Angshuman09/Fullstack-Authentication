import React from 'react'

function Header() {
  return (
    <div className='bg-[#F5DF4D] flex justify-center items-center w-full min-h-screen overflow-hidden flex-col text-center px-4 gap-3.5'>
      <h1 className=' font-bold text-[15vw] tracking-tight leading-tight bg-clip-text text-transparent bg-linear-65 from-purple-500 to-pink-500'>Hello devs</h1>
      <p className='font-light flex justify-center items-center'>Connecting developers. Creating solutions.</p>
      <button className='bg-red-300 p-4 cursor-pointer rounded-2xl hover:bg-pink-400 font-mono'>Get Started</button>
    </div>
  )
}

export default Header