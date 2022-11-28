import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Bag, CalendarBlank, CaretLeft, Clock, CurrencyDollar, MapPin } from 'phosphor-react';
import {db} from '../firebase';import JobViewMap from '../components/JobViewMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InterestForm from '../components/InterestForm';

export default function JobView() {
  const [jobs, setJobs]=useState({})
  const [show, setShow] = useState(false);
  const location=useLocation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setJob=()=>{
    setJobs(location.state.job);
  }


  useEffect(()=>{
    setJob();
  },[])
  return (
  <div className='page-container m-5'>
    <Link to='/' className='btn btn-outline-dark'><CaretLeft size={24} weight="bold" />Back to jobs</Link>
    <div className='d-flex flex-row justify-content-between mb-5'>
      <div className='job-info-header'>
        <h4 className='display-5'>{jobs.job_description}</h4>
        <p>{jobs.municipality}</p>
        <a href='https://www.ymca.org/' className='mb-4'>https://www.ymca.org/</a>
      </div>
      <div>
        <img style={{width:'9rem'}} src={jobs.logo_url}/>
      </div>
    </div>
    <div className='mt-4 mb-4 quick-facts d-flex flex-row'>
      <div className='me-auto d-flex flex-row '>
      <div className='ms-4 d-flex flex-row'><Bag size={22} className='pt-1' color='#745cac' weight="bold" /><p>{jobs.job_description}</p></div>
      <div className='ms-4 d-flex flex-row'><CalendarBlank className='pt-1' size={22} weight="bold" color='#745cac'/><p>Date Posted</p></div>
      <div className='ms-4 d-flex flex-row'><Clock className='pt-1' size={22} weight="bold" color='#745cac'/><p>Part-Time/Full-Time</p></div>
      <div className='ms-4 d-flex flex-row'><CurrencyDollar className='pt-1' size={22} weight="bold" color='#745cac'/><p>12-14/HR</p></div>
      <div className='ms-4 d-flex flex-row'><MapPin className='pt-1' size={22} weight="bold" color='#745cac'/><p>Location</p></div>
      </div>
      {/* <button className='me-4 btn btn-primary'>Submit Interest</button> */}
            <Button variant="me-4 btn btn-primary" onClick={handleShow}>
            Submit Interest
            </Button>
            <Modal  show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body><InterestForm/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
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
    <div>
      <JobViewMap job={jobs}/>
    </div>
  </div>
  )
}
