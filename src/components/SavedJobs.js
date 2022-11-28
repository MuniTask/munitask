import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase';
import React, { useEffect, useState } from 'react'
import JobItem from './JobItem';

export default function SavedJobs({user}) {
    const  [savedJobs,setSavedJobs]=useState([]);
    
      const getJobs=async()=>{
        const docRef=doc(db,'users',user.uid)
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().saved_jobs)
        setSavedJobs(docSnap.data().saved_jobs);
        
      }
    const showJob=()=>{
        if (savedJobs !==''){
            return(savedJobs.map((job, i)=> <JobItem key={i} savedJobs={savedJobs} job={job} user={user}/>))
        } else{
            return(<><p>NO jobs match this search</p></>)
        }
        
       
      }
      useEffect(()=>{
        getJobs()
      },[])
  return (
    <div>{showJob()}</div>
  )
}
