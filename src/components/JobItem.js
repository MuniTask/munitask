import React, { useState, useEffect} from 'react';
import {db} from '../firebase';

  import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {MapPin, Heart, CurrencyDollar} from "phosphor-react";
import logo from '../images/munitask-logo.png';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';


export default function JobItem({job, myjobs, user}) {
  const [currentJob, setCurrentJob]=useState(job);
 const [liked, setLiked]=useState(false)
 const  [savedJobs,setSavedJobs]=useState([]);
    
      const getSavedJobs=async()=>{
        const docRef=doc(db,'users',user.uid)
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().saved_jobs)
        const saved_lst=docSnap.data().saved_jobs
        if (saved_lst.includes(currentJob)){
          setLiked(true)
        }
        // setSavedJobs(docSnap.data().saved_jobs);
        
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
  
  const likedJob=(job)=>{
    if (savedJobs.includes(job)){
      setLiked(true);
      console.log('saved job')
    }
  }
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

  useEffect (()=>{
    setCurrentJob(job);
    getSavedJobs();
    },[liked, job])

    useEffect (()=>{
      likedJob(job);
      },[])
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
          <p className='m-0 p-0'>
            <MapPin className='pb-1' size={20} weight='bold' />
          {job.zip_code}
          </p>
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
