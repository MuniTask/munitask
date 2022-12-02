import React, { useState } from 'react'

export default function Settings({user}) {
    const [data, setData]=useState({
        email:user.email,
        phone:user.email,
        
    })
  return (
    <div>Settings</div>
  )
}
