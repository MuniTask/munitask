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
        // return "#DB2118";
        return "#009CFA"
      case "camp counselor":
        // return "blue";
        return "#5A9053"
      case "swim instructor":
        // return "#745cac";
        return "#0D3869"
      case "pool maintenance":
        // return "#33DDFF";
        return "#005989"
      case "park maintenance":
        // return "#ee7600";
        return "#746E6E"
      case "golf ranger":
        return "#E2EA8B"
        // return "green";
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
    
    <Card style={{ borderTop: `4px solid ${cardColor(job.title)}`, borderLeft:`4px solid ${cardColor(job.title)}`,borderRight:`4px solid ${cardColor(job.title)}`, borderBottom:`4px solid ${cardColor(job.title)}`}} className='job-card'>
    <Link className='job-card-link' data-testid='jobItemLinkToJob1'  to={`/${job._id}`} state={{job:currentJob}}>
      {job.logo_url?<>
      <div className='job-img-div'>
      <img className='job-img p-2' src={job.logo_url} alt={`${job.municipality} park district`} width={'150rem'}/>
      </div></>:<>
      <div>
      <img className='job-img' alt={`${job.municipality} park district`} variant="top" width={'150rem'} src={logo} />
      </div></>}
      </Link>
      <Card.Body className='job-card-body pb-0 mb-0 mt-3'  >
      <div className='d-flex flex-row justify-content-between job-description'>
        <Link className='job-card-link' data-testid='jobItemLinkToJob2' to={`/${job._id}`} state={{job:currentJob}}>
        <Card.Title className='job-card-title'>{titleCase(job.title)}</Card.Title>
        </Link>
        </div>
    <Link className='job-card-link' data-testid='jobItemLinkToJob2' to={`/${job._id}`} state={{job:currentJob}}>
        <Card.Text className='d-flex flex-row flex-wrap'>
          <div className='d-flex flex-row align-items-center wage-bubble me-2'>
           <CurrencyDollar color='rgba(86, 87, 117, .8)' size={14} weight='bold'/>
           <p className='m-0' >{job.wage}/hr</p>
           </div>
            <div className='d-flex flex-row align-items-center location-bubble'>
            <MapPin className='pb-1' color='rgba(86, 87, 117, .8)' size={18} weight='bold' />
            <p className='m-0'>{job.municipality}</p>
          </div>
        </Card.Text >
      </Link>
     
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
