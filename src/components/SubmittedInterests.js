import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import React, { Fragment, useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {db} from '../firebase'
export default function SubmittedInterests({user}) {
    const [forms, setForms]=useState([])
    const getForms=async()=>{
        const forms_lst=[]
        const forms_lst2=[]
        const data2=query(collection(db,'interestForms'),where("user_uid", "==", user.uid));
        const querySnapshot = await getDocs(data2);
        querySnapshot.forEach((doc) => {
          forms_lst.push(doc.data())
          });
          for (let x of forms_lst){
            let job_title=await(getJob(x.job_id))
            // let job_mun=await(getJob(x.job_id))
            let test=await(getJob(x.job_id)).then(
              forms_lst2.push({...x,...job_title})
            )
          }
          console.log('forms:',forms_lst2);
          setForms(forms_lst2)
    };
    // const getJob=async(job_id)=>{
    //   const docRef = doc(db, "jobs", job_id);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     return docSnap.data();
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // };
    const getJob=async(job_id)=>{
      console.log('GET JOBS FUNCTION')
      const data = await getDoc(doc(db, "jobs", job_id));
      console.log(data.data())
      const test_array=[data.data()]
      console.log(test_array)
       const newJobsList=[];
      for (let doc of test_array){
        const zip_code=await getZip(doc.municipality)
        const latitude=await getLat(doc.municipality)
        const longitude=await getLng(doc.municipality)
        const logo_url=await getLogo(doc.municipality)
        const skip=await getLng(doc.municipality).then( 
          newJobsList.push({...doc, latitude: latitude, longitude:longitude, zip_code:zip_code, logo_url:logo_url})
        )
      };
      return newJobsList
     
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
    useEffect(()=>{
        getForms();
        getJob('Dh86FoaB6t64i61IgAu3')
    },[])
  return (
   <>
   {forms?<>
   {forms.map((form, i)=><Fragment key={i}>
    <Accordion >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{form.title} - {form.municipality} Park District</Accordion.Header>
        <Accordion.Body>
         <ul className='responses-list'>
            <li><b>Ideal job start:</b></li>
            <li> {form.job_start}</li>
            <div className='mb-3'></div>
            <li><b>Ideal job end:</b></li>
            <li>{form.job_end}</li>
            <div className='mb-3'></div>
            <li><b>Do you have any direct training, certifications, or experience in
              the job you're interested in?</b></li>
              <li> {form.training}</li>
              <div className='mb-2'></div>
            <li><b>Is there anything else you'd like us to know?</b> </li>
            <li>{form.other_info}</li>
         </ul>
         {/* FIX STATE!! */}
         <Link  to={`/${form.job_id}`} state={{job:form[0]}}>View job listing</Link>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
   </Fragment>)}
    
   </>:<></>}
   
    </>
  )
}
