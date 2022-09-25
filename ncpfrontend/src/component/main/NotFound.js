import React from 'react'
import {motion} from 'framer-motion'


const NotFound = () => {
  return (
    <motion.div  initial={{rotate:0,opacity:0}} animate={{rotate:10,opacity:1,}}  >
        <div className="flex flex-col items-center justify-center h-screen" >  
            <h1 className="text-9xl font-bold">404 <i className="fas fa-thin fa-circle-exclamation"></i></h1>
            <h2 className="text-6xl font-bold">Page Not Found</h2>
            <i className=" text-6xl font-bold fas fa-thin fa-code"></i>
        </div>
    </motion.div>
  )
}

export default NotFound