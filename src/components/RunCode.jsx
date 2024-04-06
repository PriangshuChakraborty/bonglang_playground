import React from 'react'

const RunCode = ({onClick}) => {
  return (
    <button onClick={onClick} className='text-white shadow-none bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-xs px-3 py-1 text-center me-4 sm:text-sm sm:py-1.5 md:py-2 md:text-base '>RUN CODE</button>
  )
}

export default RunCode