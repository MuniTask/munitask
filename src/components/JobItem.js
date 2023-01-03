import React, { useState, useEffect} from 'react';
import {db} from '../firebase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
  import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {MapPin, Heart, CurrencyDollar} from "phosphor-react";
import logo from '../images/munitask-logo.png';
import { arrayRemove, arrayUnion, doc, updateDoc,  } from 'firebase/firestore';
import { titleCase } from '../FunctionStorage';



export default function JobItem({job, savedJobs, user, createPopUp}) {
  const [currentJob, ]=useState({...job, title:titleCase(job.title)});
//  const [liked, setLiked]=useState(false);
 const [signInPopUp, setsignInPopUp] = useState(false);
 
 const handleClosePopUp = () => setsignInPopUp(false);
 const handleShowPopUp = () => setsignInPopUp(true);
  // const checkJobs=()=>{
  //     if(savedJobs){
  //       if (savedJobs.includes(job._id)){
  //         console.log('saved job');
  //         setLiked(true)
  //       }}
  //   }

//  const handleLike = (job) => {
//   setLiked(true);
//   saveJob(job);
// }

//   const handleUnlike = (job) => {
//     setLiked(false);
//     unsaveJob(job);
//   }

  // const saveJob=async(job)=>{
  //   await updateDoc(doc(db,"users",user.uid),{
  //     saved_jobs:arrayUnion(job._id)
  //   })
  //   console.log('succesfully saved job')
  // }

  // const unsaveJob=async(job)=>{
  //   await updateDoc(doc(db,"users",user.uid),{
  //     saved_jobs:arrayRemove(job._id)
  //   })
  //   console.log('succesfully unsaved job')
  // }


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
      case "golf ranger":
        return "green";
    }
  }

  // useEffect (()=>{
  //  checkJobs();
  //   // getSavedJobs();
  //   },[])

    useEffect (()=>{
      // likedJob(job);
      },[])
  return (
    <>
   
    <div className='m-2'>
    
    <Card style={{ width: '24rem',  borderTop: `4px solid ${cardColor(job.title)}`, borderLeft:`4px solid ${cardColor(job.title)}`, borderBottom:`4px solid ${cardColor(job.title)}`}} className='job-card d-flex flex-row align-items-center'>
    <Link className='job-card-link' data-testid='jobItemLinkToJob1'  to={`/${job._id}`} state={{job:currentJob}}>
      {job.logo_url?<>
      <div className=''>
      <img className='job-img p-2' src={job.logo_url} alt={`${job.municipality} park district`} width={'150rem'}/>
      </div></>:<>
      <div>
      <img alt={`${job.municipality} park district`} variant="top" width={'150rem'} src={logo} />
      </div></>}
      </Link>
      <Card.Body className='job-card-body pb-0 mb-0'  style={{ borderTop: `4px solid ${cardColor(job.title)}`, borderRight:`4px solid ${cardColor(job.title)}`, borderBottom:`4px solid ${cardColor(job.title)}`}}>
    <Link className='job-card-link' data-testid='jobItemLinkToJob2' to={`/${job._id}`} state={{job:currentJob}}>
        <Card.Text className='d-flex flex-row justify-content-between mb-3  p-1 job-item-info-bubble'>
          <div className='d-flex flex-row align-items-center wage-bubble'>
           <CurrencyDollar color='rgba(86, 87, 117, .8)' size={15} weight='bold'/>
           <p className='m-0' style={{color:'rgba(86, 87, 117, .8)'}}>{job.wage}/hr</p>
           </div>
            <div className='d-flex flex-row align-items-center location-bubble'>
            <MapPin className='pb-1' size={20} weight='bold' />
            <p className='m-0'>{job.municipality}</p>
          </div>
        </Card.Text >
      </Link>
        <div className='d-flex flex-row justify-content-between job-description'>
        <Link className='job-card-link' data-testid='jobItemLinkToJob2' to={`/${job._id}`} state={{job:currentJob}}>
        <Card.Title className='job-card-title'>{titleCase(job.title)}</Card.Title>
        </Link>
       
        {/* {user.uid?<> */}
        {/* {liked?<><Heart onClick={()=>handleUnlike(job)} data-testid='unlikeJobBtn' weight='fill' color={cardColor(job.title)} size={20} className='ms-auto like'/></>:<><Heart data-testid='likeJobBtn' color={cardColor(job.title)} onClick={()=>handleLike(job)} size={20} className='ms-auto'/></>}</>
          :<><Heart data-testid='guestLikeJobRedirectBtn' onClick={handleShowPopUp} size={20} className='ms-auto'/></>} */}
        </div>
      </Card.Body>
    </Card>
    <Modal  show={signInPopUp} onHide={handleClosePopUp}>
              
              <Modal.Body>Sign in or create an account to save listings.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePopUp} data-testid='popUpNoThanks'>
                  No, thanks
                </Button>
                <Link to='/login'>
                  <Button variant="success" data-testid='popUpLogin'>
                    Log in
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button variant="success" data-testid='popUpSignin'>
                    Sign up
                  </Button>
                </Link>
               
              </Modal.Footer>
            </Modal>
    </div>
      </>
  )
}
