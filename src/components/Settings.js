import React, { useState } from 'react'

export default function Settings({user}) {
    const [data, setData]=useState({
        email:user.email,
        phone:user.email,
        
    })
  return (
    // if user signed in through google, then show 'no settings to edit'. otherwise, show change, email, password, username? 
    <div>Settings</div>
  )
}
