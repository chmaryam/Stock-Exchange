import React from 'react'
import videoBg from '../images/stock.webm'

export default function Home() {
  return (
    <div className='main'>
       <video src={videoBg} autoPlay loop muted/>
       {/* <div className='content'>
         <h1>Welcome</h1>
         <p>To Stock Market.</p>
       </div> */}
    </div>
  )
}