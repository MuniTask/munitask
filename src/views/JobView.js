import { arrayUnion, collection, doc, getDocs, query, updateDoc, addDoc, getDoc, arrayRemove } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Bag, BookmarkSimple, CalendarBlank, CaretLeft, Clock, CurrencyDollar, Heart, MapPin } from 'phosphor-react';
import {db} from '../firebase';
import JobViewMap from '../components/JobViewMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InterestForm from '../components/InterestForm';
import { titleCase } from '../FunctionStorage';
import { convertDate } from '../Regex';

export default function JobView({user, createPopUp}) {
  const [jobs, setJobs]=useState({})
  const [show, setShow] = useState(false);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [liked, setLiked]=useState(false);
  const location=useLocation();
  const [profileComplete,setProfileComplete]=useState(false)
  const [signInPopUp, setsignInPopUp] = useState(false);
  const handleLike = (job) => {
    setLiked(true);
    saveJob(jobs);
  }
  const handleCloseCompleteProfile = () => setShowCompleteProfile(false);
    const handleUnlike = (job) => {
      setLiked(false);
      unsaveJob(jobs);
    }
  const handleClosePopUp = () => setsignInPopUp(false);
  const handleShowPopUp = () => setsignInPopUp(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowCompleteProfile = () => setShowCompleteProfile(true);
  const setJob=()=>{
    setJobs(location.state.job);
  };
  const jobBullets=(text)=>{
    const my_array=text.split('-');
    return(my_array.map((item, i)=> <li key={i}>{item}</li>))
  };
  const cardColor=(title)=>{
    switch(title){
      case "lifeguard":
        return "#DB2118";
      case "camp counselor":
        return "blue";
      case "swim instructor":
        return "#745cac";
      case "pool maintenance":
        return "#33DDFF";
      case "park maintenance":
        return "#ee7600";
      case "golf caddy":
        return "green";
    }
  }
  const saveJob=async(job)=>{
    await updateDoc(doc(db,"users",user.uid),{
      saved_jobs:arrayUnion(job._id)
    })
    console.log('succesfully saved job')
  }

  const unsaveJob=async(job)=>{
    await updateDoc(doc(db,"users",user.uid),{
      saved_jobs:arrayRemove(job._id)
    })
    console.log('succesfully unsaved job')
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
      // window.dataLayer.push({
      //   event: 'submitted_interest',
      //   eventProps:{
      //     category:'form submit',
      //     action:'click',
      //     label:'submit interest form'
      //   }
      // })
      console.log('interest Submitted')
      handleClose();
  }

  const checkJobs=async()=>{
    if (user.uid){
      const userRef=doc(db,"users",user.uid)
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        if (docSnap.data().saved_jobs.includes(jobs._id)){
          console.log('saved job');
          setLiked(true)
        }
        if (docSnap.data().profile_completed===true){
          setProfileComplete(true)
        }
      } else {
        console.log("No saved jobs!");
      }
    }
   
   
  }

  useEffect(()=>{
    setJob();
    
  },[])
  useEffect(()=>{
    checkJobs()
   
  },[jobs])
  return (
   
  <div className='page-container jobview '>
     {jobs? <>
 
    <Link to='/' className='btn mb-3 mt-2'><CaretLeft size={20} weight="bold" />Back to jobs</Link>
    <div className='jobview-container'>
      <div className='d-flex flex-row flex-wrap justify-content-between align-items-start mt-2 mb-3'>
        <div>
          <img style={{width:'9rem'}} src={jobs.logo_url}/>
        </div>
        <div className='d-flex flex-row'>
            {user.uid?<>
                {liked?<><BookmarkSimple onClick={()=>handleUnlike(jobs)} data-testid='unlikeJobBtn' weight='fill' color={cardColor(jobs.title)} size={28} className='ms-auto like mt-3'/></>:<><BookmarkSimple data-testid='likeJobBtn' color={cardColor(jobs.title)} onClick={()=>handleLike(jobs)} size={28} className='ms-auto mt-3'/></>}</>
                  :<><BookmarkSimple data-testid='guestLikeJobRedirectBtn' onClick={handleShowPopUp} size={28} className='ms-auto mt-3'/></>}
            {user.uid?<>
              {profileComplete? <>
                <p className='interest-btn ms-3 mt-3' data-testid='submitInterestBtn' onClick={handleShow}>
                  Submit Interest Form
                </p>
                </>:<>
                <p className='interest-btn ms-3  mt-3' data-testid='submitInterestBtn' onClick={handleShowCompleteProfile}>
                  Submit Interest Form
                </p>
                </>}
                </>
                :<><p className='interest-btn ms-3  mt-3' data-testid='submitInterestBtnGuest' onClick={handleShowPopUp}>
                Submit Interest Form
              </p></>}
          </div>
      </div>
    <div className='d-flex flex-row justify-content-between flex-wrap mt-5 mb-3'>
      
      <div className='job-info-header'>
        <div className=''>
          <h4 className='job-info-header-title'>{jobs.title}</h4>
          <a rel="noreferrer" target="_blank" href={jobs.park_url} data-testid='parkUrlLink' className='mb-4'>{jobs.park_url}</a>
        <Modal  show={signInPopUp} onHide={handleClosePopUp}>
              <Modal.Body>Sign in or create an account to save listings.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" data-testid='loginModalNoBtn' onClick={handleClosePopUp}>
                  No, thanks
                </Button>
                <Link to='/login'>
                  <Button variant="success" data-testid='loginModalLoginBtn'>
                    Log in
                  </Button>
                </Link>
                <Link to='/signup' data-testid='loginModalSignupBtn'>
                  <Button variant="success">
                    Sign up
                  </Button>
                </Link>
              </Modal.Footer>
        </Modal>
        <Modal  show={showCompleteProfile} onHide={handleShowCompleteProfile}>
              <Modal.Body>Please complete your account and personal information before submitting an interest form.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" data-testid='loginModalNoBtn' onClick={handleCloseCompleteProfile}>
                  Complete later
                </Button>
                <Link to='/userinfo'>
                  <Button variant="success" data-testid='loginModalLoginBtn'>
                    Complete profile
                  </Button>
                </Link>
              </Modal.Footer>
        </Modal>
        </div>
     
        
      </div>
     
    </div>
    <div className=' mb-4 '>
      <div className=' quick-facts'>
      <div className='d-flex flex-row'><Bag size={22} className='pt-1' color='#745cac' weight="fill" /><p>{jobs.title}</p></div>
      {/* {jobs.date_added? <><div className='ms-4 d-flex flex-row'><CalendarBlank className='pt-1' size={22} weight="fill" color='#745cac'/><p>{String(jobs.date_added).match(convertDate)}</p></div></>:<></>} */}
      
      <div className='ms-4 d-flex flex-row'><Clock className='pt-1' size={22} weight="fill" color='#745cac'/><p>{jobs.full_or_part_time}-time</p></div>
      <div className='ms-4 d-flex flex-row'><CurrencyDollar className='pt-1' size={22} weight="bold" color='#745cac'/><p>{jobs.wage}</p></div>
      <div className='ms-4 d-flex flex-row'><MapPin className='pt-1' size={22} weight="fill" color='#745cac'/><p>{jobs.municipality} Park District</p></div>
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
    <div className='job-info-body mb-5'>
      <div className='qual'>
        <h4>Qualifications</h4>
     
        <ul>
          {jobs.qualifications? <>
            {jobBullets(jobs.qualifications)}</>:<>{jobs.qualifications}</>}
      
        </ul>
      </div>
      <div className='qual'>
        <h4>Responsibilities</h4>
        {jobs.responsibilities? <>
            {jobBullets(jobs.responsibilities)}</>:<></>}
      </div>
    </div>
    <div className='jobview-map-container mt-5'>
      <JobViewMap job={jobs}/>
    </div>
    </div>
    </>:<></>}
  </div>
  )
}
