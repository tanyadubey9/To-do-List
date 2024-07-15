import React from 'react'

const Navbar = () => {
  return (
    <nav className='p-2 flex justify-around bg-indigo-900  text-white'>
        <div className="logo font-bold text-xl">
            <span  className='cursor-pointer'>iTask</span>
        </div>
        <ul className='flex gap-12 font-semibold'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
