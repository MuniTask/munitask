import React, { useEffect } from 'react'
import parkImg from '../images/2880.jpg'
import saraheadshot from '../images/sara-headshot2.jpeg';
import markheadshot from '../images/mark-headshot.jpeg';
import sydneyheadshot from '../images/sydney-headshot.jpeg';
import jackheadshot from '../images/jack-headshot.jpeg';
import rubenheadshot from '../images/ruben-headshot.jpeg';
import serkanheadshot from '../images/serkan-headshot.jpeg';
import jillheadshot from '../images/jill-headshot.jpeg';
import steveheadshot from '../images/steve-headshot.jpeg';
import scottheadshot from '../images/scott-headshot.jpeg';
import { LinkedinLogo } from 'phosphor-react';
import { Link } from 'react-router-dom';
export default function WhoWeAre() {
  useEffect(()=>{
    window.dataLayer.push({
      event: 'pageview',
      page:{
        title:'Who We Are'
      }
  })},[])
  return (
    <div className='about-container'>
     <div className='who-we-are-blurb d-flex justify-content-between flex-row'>
        
          <div className='who-we-are-text '>
              <p>
            <span className='bolded-blurb' >MuniTask is a team who believes</span> <span className='regular-blurb'>seasonal workers are essential workers that make our communities a better place to live, work, and play. That's why we're sharing our knowledge across sales, analytics, local government, technology, seasonal workforce, and finance to build MuniTask into the nation's #1 seasonal job marketplace and  engagement platform connecting youth and young adults to park and recreation organizations.</span></p>
            <p><b> Want to join us? Contact hello@munitask.com</b></p>
          </div>
        <div>
            <img className='park-img' src={parkImg} alt='state park graphic' />
        </div>
        </div>
     <div>
     <h3 className='our-team text-center p-4'>Our Team</h3>
    <div className='people-section d-flex flex-row justify-content-around flex-wrap px-5'>
      
      <div className='person-card'>
        <img className='person-img mx-2' src={saraheadshot} alt='sara agate' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Sara Agate <span style={{color:'gray', fontSize:'.85rem', marginLeft:'5px'}}>Founder</span></p>
        <a target='_blank'  href='https://www.linkedin.com/in/sara-agate-mph-esq/'><LinkedinLogo className='' size={24} weight="fill" /></a>
        </div>
        
      </div>
      <div className='person-card'>
        <img className='person-img mx-2' src={sydneyheadshot} alt='sydney doemel' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Sydney Doemel</p>
         <a target='_blank'  href='https://www.linkedin.com/in/sydney-doemel-1a4841227/'><LinkedinLogo className='' size={24} weight="fill" /> </a>
        </div>
      </div>
      <div className='person-card'>
        <img className='person-img mx-2' src={markheadshot} alt='Mark Peacock' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Mark Peacock</p>
         <a target='_blank'  href='https://www.linkedin.com/in/peacockmark/'><LinkedinLogo className='' size={24} weight="fill" /> </a>
        </div>
      </div>
      <div className='person-card'>
        <img className='person-img mx-2' src={rubenheadshot} alt='Mark Peacock' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Ruben Abarca</p>
         <a target='_blank'  href='https://www.linkedin.com/in/ruben-abarca-8395124/'><LinkedinLogo className='' size={24} weight="fill" /> </a>
        </div>
      </div>
      <div className='person-card'>
        <img className='person-img mx-2' src={scottheadshot} alt='Mark Peacock' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Scott Fenstermaker</p>
         <a target='_blank'  href='https://www.linkedin.com/in/sfenster/'><LinkedinLogo className='' size={24} weight="fill" /> </a>
        </div>
      </div>
      <div className='person-card'>
        <img className='person-img mx-2' src={jackheadshot} alt='Mark Peacock' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Jack Farrar</p>
         <a target='_blank'  href='https://www.linkedin.com/in/jack-farrar-505b341a9/'><LinkedinLogo className='' size={24} weight="fill" /> </a>
        </div>
      </div>
      <div className='person-card'>
        <img className='person-img mx-2' src={serkanheadshot} alt='Mark Peacock' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Serkan Saka</p>
         <a target='_blank'  href='https://www.linkedin.com/in/serkansaka/'><LinkedinLogo className='' size={24} weight="fill" /> </a>
        </div>
      </div>
     
      <div className='person-card'>
        <img className='person-img mx-2' src={jillheadshot} alt='Mark Peacock' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Jill Velan</p>
         <a target='_blank'  href='https://www.linkedin.com/in/jill-velan-b61bb6196/'><LinkedinLogo className='' size={24} weight="fill" /></a> 
        </div>
      </div>
      <div className='person-card'>
        <img className='person-img mx-2' src={steveheadshot} alt='Mark Peacock' />
        <div className='justify-content-between d-flex flex-row'>
        <p className='person-text'>Steve Bob</p>
         <a target='_blank' ><LinkedinLogo className='' size={24} weight="fill" /> </a>
        </div>
      </div>
    </div>

     </div>
    </div>
  )
}


{/* <div className='about-founder'>
<div style={{position:'relative', zIndex:'-100'}}>
  {/* <svg style={{position:'absolute', top:'0',left:'110', zIndex:'-1', height: '750px'}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="#E8DAFF" d="M56.5,-51.1C72.8,-40.3,85.1,-20.2,84.8,-0.2C84.6,19.7,71.9,39.4,55.7,48.4C39.4,57.3,19.7,55.5,-1.1,56.6C-22,57.7,-43.9,61.8,-55.2,52.9C-66.5,43.9,-67.2,22,-65.4,1.7C-63.7,-18.5,-59.6,-37,-48.3,-47.9C-37,-58.7,-18.5,-61.9,0.8,-62.7C20.2,-63.5,40.3,-62,56.5,-51.1Z" transform="translate(100 100)" />
  </svg> */}
  {/* <svg style={{position:'absolute', bottom:'-570',right:'500', zIndex:'-1', height: '600px'}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<path fill="rgba(0,128,0,.1)" d="M27.1,-38.9C41.4,-26.9,63.5,-27.4,75.7,-17.9C87.9,-8.5,90.2,10.8,82.3,24.1C74.4,37.5,56.2,44.9,40.8,45.4C25.4,45.9,12.7,39.5,4.8,32.9C-3.1,26.3,-6.2,19.6,-8.9,14.9C-11.7,10.3,-14.1,7.8,-18.3,3.8C-22.5,-0.2,-28.5,-5.7,-31.7,-14.8C-34.9,-23.8,-35.3,-36.4,-29.5,-51.2C-23.7,-66,-11.9,-82.9,-2.7,-79.1C6.4,-75.4,12.8,-50.9,27.1,-38.9Z" transform="translate(100 100)" />
  </svg> */}
// </div>
// <h4 className='display-5 mt-5'>Meet Sara</h4>
// <img className='sara-headshot my-3' src='https://softr-prod.imgix.net/applications/3bdd2066-32ff-463d-89d7-cd3c467341d3/assets/13046465-dd60-4f48-8332-3c2dc1589e4d.jpeg'/>
//   <p className='sara-blurb'>Hi, my name is Sara Agate. Some of the biggest issues I've seen after
//       serving in both the legislative and judicial branches of government at the
//       state and federal level are how local governments are struggling to keep
//       up with the workforce changes in our modern society. This is why I've
//       created MuniTask to solve your seasonal and temporary workforce
//       shortage needs by harnessing the established power of the gig economy’s
//       hourly freelance workforce so that you can worry-less and fully serve your
//       community members.
//   </p>
//   <p><b>Sara Agate</b>, CEO & Attorney</p>

// </div>

// <div className='about-img-left p-0' >
//   <img className='about-img' style={{height: '50%'}} src='https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/illustrations/undraw/best_place_r685.svg'/>
// </div>

// <div className='about-info-boxes' >
//   <div>
//     <h4 className='boxes-title'>Work in your community.
//         Save taxpayer money.  </h4>
//   <p className='boxes-caption'>Who would have thought you can make a difference in your community and make money? At MuniTask, we believe in:</p>
//   </div>


// <div className='box-group-1 d-inline-flex'>
//     <div className='box-1 card'>
//       <PaintRoller className='about-box-img card-img-top w-25' size={32} />
//         <div className='card-body'>
//       <h5 className='about-box-title card-title'>Local gig work</h5>
//       <p className='about-box-caption card-text'>Creating jobs for residents.</p>
//       </div>
//     </div>
//     <div className='box-2 card'>
//     <Handshake className='about-box-img card-img-top w-25' size={32} />
//       <div className='card-body'>
//       <h5 className='about-box-title card-title'>Building Community</h5>
//       <p className='about-box-caption card-text'>Cultivating a culture of community and economic empowerment.</p>
//       </div>
//     </div>
//   </div>
//   <div className='box-group-2 d-inline-flex'>
//         <div className='box-3 card'>
//           <GearSix className='about-box-img card-img-top w-25'size={32} />
//           <div className='card-body'>
//           <h5 className='about-box-title card-title'>Innovation</h5>
//         <p className='about-box-caption card-text'>Harnessing the power of marketplace tech for public good.</p>
//         </div>
//       </div>
//       <div className='box-4 card'>
//           <Money className='about-box-img card-img-top w-25'size={32} />
//           <div className='card-body'>
//         <h5 className='about-box-title card-title'>Saving taxpayer dollars</h5>
//         <p className='about-box-caption card-text'>Partnering with local governments to develop the future of work.</p>
//         </div>
//       </div>
//       </div>


// </div> */}