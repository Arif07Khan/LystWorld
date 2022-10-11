import React from 'react'
import gif from "./photo/VAyR.gif";


const Reloader = () => {
  return (
            <div className='flex justify-center mt-10'>
            <img src={gif} alt="loading" className='w-20 h-20 ' />
            </div>
  )
}

export default Reloader;