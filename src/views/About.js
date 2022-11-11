import React from 'react'
import {GearSix, Handshake, Money, PaintRoller} from 'phosphor-react';

export default function About() {
  return (
    <div className='about-container'>
      <div className='about-founder'>
        <h4 className='display-5 mt-5'>Meet Sara</h4>
        <img className='sara-headshot my-3' src='https://softr-prod.imgix.net/applications/3bdd2066-32ff-463d-89d7-cd3c467341d3/assets/13046465-dd60-4f48-8332-3c2dc1589e4d.jpeg'/>
          <p className='sara-blurb'>Hi, my name is Sara Agate. Some of the biggest issues I've seen after
              serving in both the legislative and judicial branches of government at the
              state and federal level are how local governments are struggling to keep
              up with the workforce changes in our modern society. This is why I've
              created MuniTask to solve your seasonal and temporary workforce
              shortage needs by harnessing the established power of the gig economy’s
              hourly freelance workforce so that you can worry-less and fully serve your
              community members.
          </p>
          <p>Sara Agate</p>
          <p>CEO & Attorney</p>
      </div>
  
      <div className='about-img-left'>
          <img className='about-img' src='https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/illustrations/undraw/best_place_r685.svg'/>
      </div>
        
      <div className='about-info-boxes '>
          <div>
            <h4 className='boxes-title'>Work in your community.
                Save taxpayer money.  </h4>
          <p className='boxes-caption'>Who would have thought you can make a difference in your community and make money? At MuniTask, we believe in:</p>
          </div>
        
     
        <div className='box-group-1 d-inline-flex'>
            <div className='box-1 card'>
              <PaintRoller className='about-box-img card-img-top w-25' size={32} />
                <div className='card-body'>
              <h5 className='about-box-title card-title'>Local gig work</h5>
              <p className='about-box-caption card-text'>Creating jobs for residents.</p>
              </div>
            </div>
            <div className='box-2 card'>
            <Handshake className='about-box-img card-img-top w-25' size={32} />
              <div className='card-body'>
              <h5 className='about-box-title card-title'>Building Community</h5>
              <p className='about-box-caption card-text'>Cultivating a culture of community and economic empowerment.</p>
              </div>
            </div>
          </div>
          <div className='box-group-2 d-inline-flex'>
                <div className='box-3 card'>
                  <GearSix className='about-box-img card-img-top w-25'size={32} />
                  <div className='card-body'>
                  <h5 className='about-box-title card-title'>Innovation</h5>
                <p className='about-box-caption card-text'>Harnessing the power of marketplace tech for public good.</p>
                </div>
              </div>
              <div className='box-4 card'>
                  <Money className='about-box-img card-img-top w-25'size={32} />
                  <div className='card-body'>
                <h5 className='about-box-title card-title'>Saving taxpayer dollars</h5>
                <p className='about-box-caption card-text'>Partnering with local governments to develop the future of work.</p>
                </div>
              </div>
              </div>
        
      
      </div>
    </div>
  )
}
