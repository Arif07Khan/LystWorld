import React from 'react'
import gif from "./photo/VAyR.gif";


const Reloader = () => {
  return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <div className=''>
            <img src={gif} alt="loading" className='' />
            </div>
        </div>
  )
}

export default Reloader;