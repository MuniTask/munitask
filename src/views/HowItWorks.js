import React, { useState } from 'react'
import {db} from '../firebase';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
export default function HowItWorks() {
  const [myjobs, setmyjobs]=useState([])
  const getJobs=async()=>{
        const data = await getDocs(collection(db, 'jobs'));
        console.log(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
        setmyjobs(data.docs.map((doc)=>({...doc.data(), id:doc.id}))); 
        const que=query(collection(db,'parks'),where("municipality","==",mun));
      const data2 = await getDocs(que);
      }
  
  
  // https://firebase.google.com/docs/firestore/solutions/aggregation
  return (
    <div className='page-container'>HowItWorks</div>
  )
}
