import React, { useEffect, useState } from 'react'
import {db} from '../firebase';
import { collection, query, where, getDocs, addDoc, limit } from "firebase/firestore";
import JobItem from '../components/JobItem';
export default function HowItWorks() {
  const [myjobs, setmyjobs]=useState([])
  const getJobs=async()=>{
        const data = await getDocs(collection(db, 'jobs'));
        console.log(data)
        console.log(data.docs.map((doc)=>({...doc.data(), id:doc.id, latitude:getLat(doc.data().municipality),longitude:getLng(doc.data().municipality),zip_code:getZip(doc.data().municipality)}))); 
        setmyjobs(data.docs.map((doc)=>({...doc.data(), id:doc.id, latitude:getLat(doc.data().municipality),longitude:getLng(doc.data().municipality),zip_code:getZip(doc.data().municipality)}))); 
  }
 
  const getZip=async(mun)=>{
    const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
    const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}))
   const mun_zip=data_lst[0].zip_code
  return mun_zip
};
const getLng=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}))
 const mun_lng=data_lst[0].longitude
return mun_lng
};
const getLat=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}))
 const mun_lat=data_lst[0].latitude
return mun_lat
};
const showJob=()=>{
  if (myjobs !==''){
      return(myjobs.map((job, i)=> <JobItem key={i} myjobs={myjobs} job={job}/>))
  } else{
      return(<><p>No jobs match this search</p></>)
  }
  
 
}
  useEffect(() => {
   
    getJobs();
  }, []);
  // https://firebase.google.com/docs/firestore/solutions/aggregation
  return (
    <div className='page-container'></div>
  )
}
