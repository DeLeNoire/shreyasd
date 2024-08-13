'use client'
import React from 'react'
import App from './Band';

  
export default function Hero() {
  return (
    <div className='flex items-center justify-center  h-screen lg:bg-gradient-to-b from-black to-white'>
    <div 
        style={{
            flex: 1,
            textAlign: 'center',
            color: 'black',
            height: '100vh',
        }}
    >
        <App />
    </div>
    </div>
  )
}
