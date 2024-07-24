import React from 'react'

function SearchInput({setSearch}) {
  return (
    <>
     <form className="form relative mb-3">
  <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
    <svg
      width="17"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="search"
      className="w-5 h-5 text-[#ffffffd9]"
    >
      <path
        d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
  <input  
    onChange={(event)=>setSearch(event.target.value)}
    className="input bg-[#0e151d] rounded-full px-10 py-2 text-white focus:shadow-none focus:ring-0  border-1 border-[#4c4c4c5e] focus:outline-none focus:border-secondary/[0.5] placeholder-gray-400 transition-all duration-300 "
    placeholder="Search..."
    required=""
    type="text"
  />
  <button type="reset" onClick={()=>setSearch('')} className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-[#ffffffd9]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </button>
</form>

    </>
  )
}

export default SearchInput
