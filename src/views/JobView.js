import React from 'react'
import { useLocation } from 'react-router-dom'

export default function JobView() {
  // const location=useLocation();
  // const {job}=location.state

  return (
  <div className='page-container m-5'>
    <div className='job-info-header'>
      <h4 className='display-5'>LifeGuard</h4>
      <p>YMCA - Youth Development, Healthy Living, Community</p>
      <a href='https://www.ymca.org/' className='mb-4'>https://www.ymca.org/</a>
    </div>
    <div className='mt-4 mb-4 quick-facts d-flex flex-row'>
      <div className='me-auto d-flex flex-row'>
      <div className='ms-4'>Job Type</div>
      <div className='ms-4'>Date Posted</div>
      <div className='ms-4'>Part-Time/Full-Time</div>
      <div className='ms-4'>$$/HR</div>
      <div className='ms-4'>Location</div>
      </div>
      <button className='me-4 btn btn-primary'>Apply</button>
    </div>
    <div className='job-info-body'>
      <div className='qual'>
        <h4>Qualifications</h4>
        <ul>
          <li>You may be required to show proof of your fully vaccinated status at the time of your start date, or have received a medical or religious exemption from the fully vaccinated requirement at the time of your start date</li>
          <li>Certified lifeguard and first aide training through American Red Cross- not required, will provide training</li>
          <li>CPR Certified or ability to obtain</li>
          <li>Retrieve 3 rings from 4-7 foot depth in one breath</li>
        </ul>
      </div>
      <div className='qual'>
        <h4>Responsibilities</h4>
        <ul>
          <li>Observe the safety and wellbeing of swimmers</li>
          <li>Observe weather – as conditions may change rapidly</li>
          <li>This is an “as needed” position responsible for monitoring the safety and wellbeing of guest as they use the pools at Rock Eagle
</li>
        
        </ul>
      </div>
    </div>
  </div>
  )
}
