import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { getDatabase, ref, onValue, set} from "firebase/database";
export default function AddToDb() {
  const  [myjobs, setmyjobs]=useState([])
    const db = getDatabase();
  const parksRef = ref(db, 'parks');
 
  
  const getJobs=()=>{
    onValue(parksRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      let new_lst=[]
      for (let x of data){
       new_lst.push(x)
      }
      console.log(new_lst)
      setmyjobs(new_lst)
    });
  }

const writeParkData = (e)=> {
  e.preventDefault()
  const db = getDatabase();
  set(ref(db, 'parks/' + e.target.job_id.value), {
    job_id:e.target.job_id.value,
    budget:e.target.budget.value,
    fiscal_year:e.target.fiscal_year.value,
    job_url:e.target.job_url.value,
    municipal_location:e.target.municipal_location.value,
    municipality:e.target.municipality.value,
    number_of_jobs:e.target.number_of_jobs.value,
    park_url:e.target.park_url.value,
    street_address:e.target.street_address.value,
    zip_code:e.target.zip_code.value,
    job_description:e.target.job_description.value,
    job_requirements:e.target.job_requirements.value,
    job_qualifications:e.target.job_qualifications.value,
    logo_url:e.target.logo_url.value
  });
}

useEffect(()=>{
  getJobs();
},[])
  return (
    <>
    <form className='' onSubmit={(e)=>{writeParkData(e)}}>
        <label htmlFor="job_id" className="me-3 m-4">Job ID</label>
        <input type='text' name='job_id' /><br/>
        <label htmlFor="budget" className="me-3 m-4">budget</label>
        <input type='text' name='budget'/><br/>
        <label htmlFor="fiscal_year" className="me-3 m-4">fiscal_year</label>
        <input type='text' name='fiscal_year'/><br/>
        <label htmlFor="job_url" className="me-3 m-4">job_url</label>
        <input type='text' name='job_url'/><br/>
        <label htmlFor="municipal_location" className="me-3 m-4">municipal_location</label>
        <input type='text' name='municipal_location' /><br/>
        <label htmlFor="municipality" className="me-3 m-4">municipality</label>
        <input type='text' name='municipality'/><br/>
        <label htmlFor="number_of_jobs" className="me-3 m-4">number_of_jobs</label>
        <input type='text' name='number_of_jobs'/><br/>
        <label htmlFor="park_url" className="me-3 m-4">park_url</label>
        <input type='text' name='park_url'/><br/>
        <label htmlFor="street_address" className="me-3 m-4">street_address</label>
        <input type='text' name='street_address'/><br/>
        <label htmlFor="zip_code" className="me-3 m-4">zip_code</label>
        <input type='text' name='zip_code'/><br/>
        <label htmlFor="job_description" className="me-3 m-4">job_description</label>
        <textarea type='text' name='job_description' rows='3' cols='30'/><br/>
        <label htmlFor="job_qualifications" className="me-3 m-4">job_qualifications</label>
        <textarea type='text' name='job_qualifications' rows='3' cols='30'/><br/>
        <label htmlFor="job_requirements" className="me-3 m-4" >job_requirements</label>
        <textarea type='text' name='job_requirements' rows='3' cols='30'/><br/>
        <label htmlFor="logo_url" className="me-3 m-4" >logo_url</label>
        <input type='text' name='logo_url'/><br/>
        <button type='submit'>Submit</button>
        </form></>
  )
}
