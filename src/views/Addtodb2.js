import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { collection, addDoc, getDocs} from "firebase/firestore";
export default function Addtodb2() {
  const  [myjobs, setmyjobs]=useState([])
//     const db = getDatabase();
//   const parksRef = ref(db, 'parks');
//   const jobRef=ref(db,'jobs');
const  jobref2=collection(db,'jobs')
 const addMunData=async(e)=>{
    e.preventDefault();
    
        await addDoc(collection(db, "munitask/"), {
        
            budget:e.target.budget.value,
            fiscal_year:e.target.fiscal_year.value,
            job_url:e.target.job_url.value,
            municipal_location:e.target.municipal_location.value,
            municipality:e.target.municipality.value,
            number_of_jobs:e.target.number_of_jobs.value,
            park_url:e.target.park_url.value,
            street_address:e.target.street_address.value,
            zip_code:e.target.zip_code.value,
            logo_url:e.target.logo_url.value
        });
        
 }
 const getJobs=async()=>{
    const data = await getDocs(collection(db, 'jobs'));
    
    console.log(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
    setmyjobs(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
 }
  
//   const getJobs=()=>{
//     onValue(parksRef, (snapshot) => {
//       const data = snapshot.val();
//       console.log(data)
//       let new_lst=[]
//       for (let x of data){
//        new_lst.push(x)
//       }
//       console.log(new_lst)
//       setmyjobs(new_lst)
//     });
//   }

// const writeParkData = (e)=> {
//   e.preventDefault()
//   const db = getDatabase();
//   set(ref(db, 'parks/' + e.target.mun_id.value), {
//     mun_id:e.target.mun_id.value,
//     budget:e.target.budget.value,
//     fiscal_year:e.target.fiscal_year.value,
//     job_url:e.target.job_url.value,
//     municipal_location:e.target.municipal_location.value,
//     municipality:e.target.municipality.value,
//     number_of_jobs:e.target.number_of_jobs.value,
//     park_url:e.target.park_url.value,
//     street_address:e.target.street_address.value,
//     zip_code:e.target.zip_code.value,
//     job_description:e.target.job_description.value,
//     job_requirements:e.target.job_requirements.value,
//     job_qualifications:e.target.job_qualifications.value,
//     logo_url:e.target.logo_url.value
//   });
// }


// const writeJobsData = (e)=> {
//   e.preventDefault()
//   const db = getDatabase();
//   set(ref(db, 'jobs/' + e.target.job_id.value), {
//     job_id:e.target.job_id.value,
//     municipality:e.target.municipality.value,
//     zip_code:e.target.zip_code.value,
//     job_description:e.target.job_description.value,
//     job_requirements:e.target.job_requirements.value,
//     job_qualifications:e.target.job_qualifications.value,
//     hourly_wage:e.target.hourly_wage.value,
//     full_part_time:e.target.full_part_time.value,
//     dates:e.target.dates.value,
//     logo_url:e.target.logo_url.value
//   });
// }
useEffect(()=>{
  getJobs();
},[])
  return (
    <>
    <h1 className='display-5'>Municipality entry</h1>
    <form className=' d-flex flex-row flex-wrap align-items-center' onSubmit={(e)=>{addMunData(e)}}>
        <div className="me-4 mb-3" >
        <label htmlFor="id" >Municipality ID</label>
        <input type='text'name='id' /><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="budget" >budget</label>
        <input type='text' name='budget'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="fiscal_year" >fiscal_year</label>
        <input type='text'  name='fiscal_year'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="job_url" >job_url</label>
        <input type='text' name='job_url'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="municipal_location" >municipal_location</label>
        <input type='text' name='municipal_location' /><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="municipality" >municipality</label>
        <input type='text' name='municipality'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="number_of_jobs" >number_of_jobs</label>
        <input type='text' name='number_of_jobs'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="park_url" >park_url</label>
        <input type='text' name='park_url'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="street_address" >street_address</label>
        <input type='text' name='street_address'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="zip_code" >zip_code</label>
        <input type='text' name='zip_code'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="logo_url" className="me-3 m-4" >logo_url</label>
        <input type='text' name='logo_url'/><br/>
        </div>
        <button type='submit'>Submit</button>
        </form>



        {/* <h1 className='display-5'> Job entry</h1>
        <form className='d-flex flex-row flex-wrap align-items-center' onSubmit={(e)=>{writeJobsData(e)}}>
        <div className="me-4 mb-3" >
        <label htmlFor="job_id" >Job ID</label>
        <input type='text' name='job_id' /><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="municipality" >municipality</label>
        <input type='text' name='municipality'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="zip_code" >zip_code</label>
        <input type='text' name='zip_code'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="hourly_wage" >hourly_wage</label>
        <input type='text' name='hourly_wage'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="full_part_time" >full_part_time</label>
        <input type='text' name='full_part_time'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="dates" >dates</label>
        <input type='text' name='dates'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="job_description" >job_description</label>
        <textarea type='text' name='job_description' rows='3' cols='30'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="job_qualifications" >job_qualifications</label>
        <textarea type='text' name='job_qualifications' rows='3' cols='30'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="job_requirements"  >job_requirements</label>
        <textarea type='text' name='job_requirements' rows='3' cols='30'/><br/>
        </div>
        <div className="me-4 mb-3" >
        <label htmlFor="logo_url"  >logo_url</label>
        <input type='text' name='logo_url'/><br/>
        </div>
        <button type='submit'>Submit</button>
          </form> */}
          
          </>
  )
}
