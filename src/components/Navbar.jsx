import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-slate-800 text-white py-1'>
            <div className="log">
                <span className='font-bold text-xl'>MyTodo</span>
            </div>
            <ul className='flex gap-7'>
                <li><a href="#" className='hover:font-bold transition'>Home</a></li>
                <li><a href="#" className='hover:font-bold transition'>YourTask</a></li>
            </ul>
        </nav>
    )
}

export default Navbar