import React, { useState, useEffect} from 'react';
import {db} from '../firebase';

  import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {MapPin, Heart, CurrencyDollar} from "phosphor-react";
import logo from '../images/munitask-logo.png';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';


export default function JobItem({job, myjobs, user}) {
  const [currentJob, setCurrentJob]=useState([]);
 const [liked, setLiked]=useState(false)
 const  [savedJobs,setSavedJobs]=useState([]);
    
      const getJobs=async()=>{
        const docRef=doc(db,'users',user.uid)
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().saved_jobs)
        setSavedJobs(docSnap.data().saved_jobs);
        
      }
 const handleLike = (job) => {
  setLiked(true);
  saveJob(job);
}

  const handleUnlike = (job) => {
    setLiked(false);
    unsaveJob(job);
  }

  const saveJob=async(job)=>{
    await updateDoc(doc(db,"users",user.uid),{
      saved_jobs:arrayUnion(job)
    })
    console.log('succesfully saved job')
  }

  const unsaveJob=async(job)=>{
    await updateDoc(doc(db,"users",user.uid),{
      saved_jobs:arrayRemove(job)
    })
    console.log('succesfully unsaved job')
  }
  
  const cardColor=(title)=>{
    switch(title){
      case "lifeguard":
        return "maroon";
      case "camp counselor":
        return "blue";
      case "swim instructor":
        return "#745cac";
      case "pool maintenance":
        return "gold";
      case "park maintenance":
        return "pink";
      case "golf ranger":
        return "green";
    }
  }
  // const showWage=(job)=>{
  //   if (job.wage <= 9.25){
  //     return <MapPin className='pb-1' size={20} weight='bold' />
  //   }
  //   else if (job.wage > 9.25 && job.wage <= 11){
  //     return (<><MapPin className='pb-1' size={20} weight='bold' /><MapPin className='pb-1' size={20} weight='bold' /></>)
  //   }
  //   else if (job.wage > 11 && job.wage <= 14){
  //     return (<><MapPin className='pb-1' size={20} weight='bold' /><MapPin className='pb-1' size={20} weight='bold' /><MapPin className='pb-1' size={20} weight='bold' /></>)
  //   }
  //   else if (job.wage > 14){
  //     return (<><MapPin className='pb-1' size={20} weight='bold' /><MapPin className='pb-1' size={20} weight='bold' /><MapPin className='pb-1' size={20} weight='bold' /><MapPin className='pb-1' size={20} weight='bold' /></>)
  //   }
  // }
  useEffect (()=>{
    setCurrentJob(job);
    getJobs();
    },[liked])
  return (
    <>
   
    <div className='m-2'>
    
    <Card style={{ width: '24rem' }} className='d-flex flex-row align-items-center'>
    <Link className='job-card-link '  to={`/${job._id}`} state={{job:currentJob}}>
      {job.logo_url?<>
      <div className=''>
      <img src={job.logo_url} width={'150rem'}/>
      </div></>:<>
      <div>
      <img variant="top" width={'150rem'} src={logo} />
      </div></>}
      </Link>
      <Card.Body className='job-card-body'  style={{background:`${cardColor(job.title)}`, border: `1px solid ${cardColor(job.title)}`}}>
    <Link className='job-card-link '  to={`/${job._id}`} state={{job:currentJob}}>
        <Card.Text className='d-flex flex-row justify-content-between'>
          {job.municipality}  
          <div className=''>
            <MapPin className='pb-1' size={20} weight='bold' />
          {job.zip_code}
          </div>
        </Card.Text >
        <Card.Title>{job.title}</Card.Title>
      </Link>
        <Card.Text className='d-flex flex-row justify-content-between job-description'>
        <CurrencyDollar size={18} weight='bold'/>{job.wage}
       
        {liked?<><Heart onClick={()=>handleUnlike(job)} weight='fill' size={20} className='ms-auto like'/></>:<><Heart onClick={()=>handleLike(job)} size={20} className='ms-auto'/></>}
        
        </Card.Text>
      </Card.Body>
    </Card>
    
    </div>
      </>
  )
}
