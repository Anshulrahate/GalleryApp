import React from 'react'
import { ImSearch } from "react-icons/im";
const Header = () => {
  return (
    <div>
      <section className="w-full min-h-[80px] shadow-2xl bg-amber-500 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold">
        Gallery Application
      </h1>
      <ul className="flex gap-5 justify-center items-center p-2 rounded">
        <li>Home</li>
        <li>Images</li>
        <li>About Us</li>
        <li>
          <input
            type="text"
            className="border border-white rounded-[5px] outline-none pl-2 pt-1 pb-2 pr-1 text-white"
            placeholder="Search Here"
          />
        </li>
        <li>
          <button className="border bg-amber-100 p-2.5 rounded-[5px] hover:bg-amber-200">
            <ImSearch />
          </button>
        </li>
      </ul>
    </section>
    </div>
  )
}

export default Header
