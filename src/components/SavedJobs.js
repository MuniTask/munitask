import { arrayRemove, collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import {db} from '../firebase';
import React, { useEffect, useState } from 'react'
import JobItem from './JobItem';

export default function SavedJobs({user}) {
    const  [savedJobs,setSavedJobs]=useState([]);
    // const getJobs=async()=>{
    //   const docRef=doc(db,'users',user.uid)
    //   const docSnap = await getDoc(docRef);
    //   console.log(docSnap.data().saved_jobs)
    //   setSavedJobs(docSnap.data().saved_jobs);
      
    // }
       const getJobs=async()=>{
      const data = await getDoc(doc(db,'users',user.uid));
      console.log(data.data())
      const newJobsList=[];
      for (let doc of data.data().saved_jobs){
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
  };
  
  //   const getJobs=async()=>{
  //     const data = await getDocs(collection(db, 'jobs'));
  //     const newJobsList=[];
  //     for (let doc of data.docs){
  //       const zip_code=await getZip(doc.data().municipality)
  //       const latitude=await getLat(doc.data().municipality)
  //       const longitude=await getLng(doc.data().municipality)
  //       const logo_url=await getLogo(doc.data().municipality)
  //       const skip=await getLng(doc.data().municipality).then( 
  //         newJobsList.push({...doc.data(), latitude: latitude, longitude:longitude, zip_code:zip_code, logo_url:logo_url})
  //       )
  //     };
  //     console.log(newJobsList)
  //     setSavedJobs(newJobsList)
  // };
  
  
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
