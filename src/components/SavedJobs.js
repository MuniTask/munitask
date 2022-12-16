import { arrayRemove, collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import {db} from '../firebase';
import React, { useEffect, useState } from 'react'
import JobItem from './JobItem';

export default function SavedJobs({user}) {
    const  [savedJobs,setSavedJobs]=useState([]);
    const [savedJobIds, setSavedJobIds]=useState([]);

       const getJobs=async()=>{
      const data = await getDoc(doc(db,'users',user.uid));
      const newJobsList=[];
      const queryJobsList=[]
      const job_ids=[]
      if (data.data().saved_jobs !== undefined){
          for (let doc of data.data().saved_jobs){
            job_ids.push(doc);
            const data2=query(collection(db,'jobs'),where("_id", "==", doc));
            const querySnapshot = await getDocs(data2);
            querySnapshot.forEach((doc) => {
              queryJobsList.push(doc.data())
              });
          };
          console.log('queryJobsList',queryJobsList)
          for (let doc of queryJobsList){
            const zip_code=await getZip(doc.municipality)
            const latitude=await getLat(doc.municipality)
            const longitude=await getLng(doc.municipality)
            const logo_url=await getLogo(doc.municipality)
            const skip=await getLng(doc.municipality).then( 
              newJobsList.push({...doc, latitude: latitude, longitude:longitude, zip_code:zip_code, logo_url:logo_url})
            )
          };
          console.log(newJobsList)
          setSavedJobs(newJobsList)
          setSavedJobIds(job_ids)
        }
  };
  
 
  
  const getZip=async(mun)=>{
    const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
    const data2 = await getDocs(que);
    const data_lst=data2.docs.map((doc)=>({...doc.data()}));
    if (data_lst == null || data_lst.length==0){
      return 0
    }
    const mun_zip=data_lst[0].zip_code;
    return mun_zip;
  };  
  
  const getLogo=async(mun)=>{
    const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
    const data2 = await getDocs(que);
    const data_lst=data2.docs.map((doc)=>({...doc.data()}));
    if (data_lst == null || data_lst.length==0){
      return 0
    }
    const mun_logo=data_lst[0].logo_url;
    return mun_logo;
  };  
  
  const getLng=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst == null || data_lst.length==0){
    return 0
  }
  const mun_lng=data_lst[0].longitude;
  return mun_lng;
  };
  const getLat=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst == null || data_lst.length==0){
    return 0
  }
  const mun_lat=data_lst[0].latitude;
  return mun_lat;
  };
  
    const showJob=()=>{
        if (savedJobs !==[]){
            return(savedJobs.map((job, i)=> <JobItem key={i} savedJobs={savedJobIds} job={job} user={user}/>))
        } else if (savedJobs ===[]){
            // return(<><p>NO jobs match this search</p></>)
            console.log('no saved jobs')
        }
        
       
      }
      useEffect(()=>{
        getJobs()
      },[])
  return (
    <div>
      <div className='d-flex flex-row flex-wrap'>
      {showJob()}
      </div>
    </div>
  )
}
