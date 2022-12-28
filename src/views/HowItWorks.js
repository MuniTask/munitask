import React, { Fragment, useEffect, useState } from 'react';
import FAQs from './/FAQs';

export default function HowItWorks({}) {
 
  

useEffect(()=>{
  window.dataLayer.push({
    event: 'pageview',
    page:{
      title:'howItWorks'
    }
})},[])
  return (
    <div className='page-container'>
    
    <FAQs/>
    </div>
  )
}
