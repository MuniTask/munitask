import React, { useEffect, useState } from 'react';
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
    <>
    <h4 className='display-4'>How It Works</h4>
    <FAQs/>
    </>
  )
}
