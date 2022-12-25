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
    
    <FAQs/>
    </>
  )
}
