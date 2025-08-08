import React from 'react'

function Navbar() {
  return (
    

<nav class=" border-gray-200 bg-yellow-100">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-zinc-500">OAuth</span>
  </a>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

      <button type="button" class="text-white bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center hover:bg-amber-400">Login</button>
  </div>
  </div>
</nav>

  )
}

export default Navbar