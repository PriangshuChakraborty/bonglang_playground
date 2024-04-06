import React from 'react'

const Output = ({output,count}) => {
    return (
        <div className='w-[91.5vw] bg-zinc-900 text-white text-sm px-2 py-1 mt-5 overflow-x-scroll sm:text-base sm:px-3 sm:py-1.5 sm:mt-6 md:mt-8 md:px-4 md:py-2'> 
            {count === 1 ? <pre className='text-red-600 mb-1 sm:mb-1.5'>❌❌ Babumoshai holo nah !!🤦‍♂️🤦‍♀️</pre>:<pre className='text-yellow-600 mb-1 sm:mb-1.5'>Babumoshai tomar hobe !!👌🎉</pre>}
            {count === 0 ? <pre className='ml-1 sm:ml-1.5 md:ml-3'>{output}</pre> : count === 1 ? <pre className='ml-1 text-red-300 sm:ml-1.5 md:ml-3'>{output}</pre> : <pre className='ml-1 text-blue-300 sm:ml-1.5 md:ml-3'>{output}</pre>}
        </div>
  )
}

export default Output
