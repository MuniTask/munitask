import { arrayUnion, collection, doc, getDocs, query, updateDoc, addDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Bag, CalendarBlank, CaretLeft, Clock, CurrencyDollar, MapPin } from 'phosphor-react';
import {db} from '../firebase';import JobViewMap from '../components/JobViewMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InterestForm from '../components/InterestForm';

export default function JobView({user, createPopUp}) {
  const [jobs, setJobs]=useState({})
  const [show, setShow] = useState(false);
  const location=useLocation();
  const [signInPopUp, setsignInPopUp] = useState(false);
 
 const handleClosePopUp = () => setsignInPopUp(false);
 const handleShowPopUp = () => setsignInPopUp(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setJob=()=>{
    setJobs(location.state.job);
  }
  const writeInterestForm = async(e)=> {
    e.preventDefault()
    
      await addDoc(collection(db,"interestForms"),{
        
        user_uid:user.uid,
        job_id:e.target.job_id.value,
        job_start:e.target.job_start.value,
        job_end:e.target.job_end.value,
        training: e.target.certifications.value,
        other_info:e.target.other_info.value
      })
  }

  useEffect(()=>{
    setJob();
  },[])
  return (
  <div className='page-container me-5 ms-5 mt-2'>
    <Link to='/' className='btn mb-3 mt-2'><CaretLeft size={20} weight="bold" />Back to jobs</Link>
    <div className='jobview-container'>
    <div className='d-flex flex-row justify-content-between mb-5'>
      <div className='job-info-header'>
        <div className='d-flex flex-row align-items-baseline'>
          <h4 className='display-5'>{jobs.title}</h4>
          {user.uid?<><p className='interest-btn ms-3 ' data-testid='submit-interest-btn' onClick={handleShow}>
            Submit Interest
          </p></>
          :<><p className='interest-btn ms-3 ' data-testid='submit-interest-btn-guest' onClick={handleShowPopUp}>
          Submit Interest
        </p></>}
        <Modal  show={signInPopUp} onHide={handleClosePopUp}>
              
              <Modal.Body>Sign in or create an account to save listings.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" data-testid='login-modal-no-btn' onClick={handleClosePopUp}>
                  No, thanks
                </Button>
                <Link to='/login'>
                  <Button variant="success" data-testid='login-modal-login-btn'>
                    Log in
                  </Button>
                </Link>
                <Link to='/signup' data-testid='login-modal-signup-btn'>
                  <Button variant="success">
                    Sign up
                  </Button>
                </Link>
              </Modal.Footer>
        </Modal>
        </div>
        <p>{jobs.municipality} Park Disctrict</p>
        <a href={jobs.park_url} data-testid='park-url-link' className='mb-4'>{jobs.park_url}</a>
        
      </div>
      <div>
        <img style={{width:'9rem'}} src={jobs.logo_url}/>
      </div>
    </div>
    <div className='mt-4 mb-4 quick-facts d-flex flex-row'>
      <div className='me-auto d-flex flex-row '>
      <div className='ms-4 d-flex flex-row'><Bag size={22} className='pt-1' color='#745cac' weight="fill" /><p>{jobs.title}</p></div>
      <div className='ms-4 d-flex flex-row'><CalendarBlank className='pt-1' size={22} weight="fill" color='#745cac'/><p>Date Posted</p></div>
      <div className='ms-4 d-flex flex-row'><Clock className='pt-1' size={22} weight="fill" color='#745cac'/><p>Part-Time/Full-Time</p></div>
      <div className='ms-4 d-flex flex-row'><CurrencyDollar className='pt-1' size={22} weight="bold" color='#745cac'/><p>12-14/HR</p></div>
      <div className='ms-4 d-flex flex-row'><MapPin className='pt-1' size={22} weight="fill" color='#745cac'/><p>Location</p></div>
      </div>
      {/* <button className='me-4 btn btn-primary'>Submit Interest</button> */}
            
            <Modal  show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Interest Form</Modal.Title>
              </Modal.Header>
              <Modal.Body><InterestForm user={user} job={jobs} writeInterestForm={writeInterestForm}/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" data-testid='close-interest-form-btn' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
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
    <div className='jobview-map-container'>
      <JobViewMap job={jobs}/>
    </div>
    </div>
  </div>
  )
}
