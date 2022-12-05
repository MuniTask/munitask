import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
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
            let job_mun=await(getJob(x.job_id))
            let test=await(getJob(x.job_id)).then(
              forms_lst2.push({...x,municipality:job_mun.municipality, title:job_title.title})
            )
          }
          console.log('forms:',forms_lst2);
          setForms(forms_lst2)
    };
    const getJob=async(job_id)=>{
      const docRef = doc(db, "jobs", job_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    useEffect(()=>{
        getForms();
        getJob('Dh86FoaB6t64i61IgAu3')
    },[])
  return (
   <>
   {forms?<>
   {forms.map((form, i)=><>
    <Accordion key={i}>
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
         <Link  to={`/${form.job_id}`} state={{job:form}}>View job listing</Link>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
   </>)}
    
   </>:<></>}
   
    </>
  )
}
