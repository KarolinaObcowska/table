import React from 'react'

const Loader = ({ small }) => {
  return (
    <div className="flex justify-center  w-screen h-screen items-center">
      <span className={`${small ? 'smallCircle' : 'circle'} animate-loader`}></span>
      <span className={`${small ? 'smallCircle' : 'circle'} animate-loader animation-delay-200`}></span>
      <span className={`${small ? 'smallCircle' : 'circle'} animate-loader animation-delay-400`}></span>
    </div>
  )
}

export default Loader
