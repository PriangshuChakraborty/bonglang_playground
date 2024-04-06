import React, { useState } from 'react'

const Copy = ({text,name,details}) => {
    const [copied, setCopied] = useState(false)
    
    const copytoclipboard = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 500)
    }
    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='w-[90%]'>
                <h1 className="text-lg font-bold text-gray-900 mt-4 pb-2 border-b-2 border-gray-900 w-full sm:text-xl sm:mt-5 md:text-2xl md:mt-7 md:pb-3 lg:text-3xl">{name}</h1>
                <p className='mt-2 text-sm text-white sm:mt-3 sm:text-base md:text-lg md:mt-4'>{details}</p>
             </div>
      <div className='w-[90%] text-sm bg-zinc-900 text-white px-5 py-5 my-8 mx-8 flex flex-row justify-between items-start sm:text-base md:text-lg'>   
              <pre>
                {text}
            </pre>
            <div className='rounded-md p-2 bg-zinc-700'>   
           {copied ?(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>)
              :
            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6" onClick={copytoclipboard}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>)
                }
                </div> 
            </div>


    </div>
  )
}

export default Copy

