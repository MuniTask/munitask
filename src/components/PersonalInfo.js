import { doc, getDoc } from "firebase/firestore";
import { MDBContainer, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import {db} from '../firebase';
export default function PersonalInfo({ writePersonalInfo, user }) {
  const [startDate, setStartDate] = useState(new Date());
  const [currentUser, setCurrentUser]=useState({})
  const illinois_cities = [];

  const [data, setData]=useState({
    first_name:currentUser.first_name,
    email:currentUser.email,
    city:currentUser.city,
    zip:currentUser.zip,
    social: currentUser.social,
    birthday:currentUser.birthday
  })
  const getUser=async()=>{
        const docRef=doc(db,'users',user.uid)
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        setCurrentUser(docSnap.data())
       
        
      }
  // handle on change according to input name and setState
  const handleChange = (e) => {
    setData({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // take data to submit
  };
useEffect(()=>{
  getUser()
},[])
  return (
    <MDBContainer fluid>
      <form onSubmit={(e) => {  writePersonalInfo(e); handleSubmit(e)}} >
        <div className="form-row mb-3">
          <div className="form-group d-flex flex-row">
            <div className="w-25 me-4">
              <label htmlFor="first_name">First Name</label>
              {currentUser.first_name?<> <input name="first_name" type="text" defaultValue={currentUser.first_name} onChange={handleChange} className="form-control " id="first_name"  /></>
              :<> <input name="first_name" type="text" placeholder="First Name" onChange={handleChange} className="form-control " id="first_name"  /></>}
             
            </div>
            <div className="w-25 me-4">
              <label htmlFor="last_name">Last Name</label>
              {currentUser.last_name?<><input name="last_name" type="text" className="form-control " id="last_name" defaultValue={currentUser.last_name} onChange={handleChange}/></>
              :<><input name="last_name" type="text" className="form-control " id="last_name" placeholder="Last Name" /></>}
              
            </div>
            <div className="w-25">
              <label htmlFor="inputEmail4">Email</label>
              {currentUser.email?<><input name="email" type="email" className="form-control" id="inputEmail4" defaultValue={currentUser.email} onChange={handleChange}/></>
              :<><input name="email" type="email" className="form-control" id="inputEmail4" placeholder="Email" /></>}
             
            </div>
          </div>
          <div className="form-group col-md-2 mt-3">
            <label htmlFor="birthday">Birthday</label>
            {currentUser.birthday?<><input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" defaultValue={currentUser.birthday} onChange={handleChange}/></>
            :<><input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" /></>}
           
          </div>
        </div>

        <div className="form-group d-flex flex-row mb-5">
          <div className="w-25 me-4">
            <label htmlFor="inputState">State</label>
            <select name="state" id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>Illinois</option>
            </select>
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputCity">City</label>
            <input name="city" type="text" className="form-control" id="inputCity" />
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputZip">Zip</label>
            <input name="zip" type="text" className="form-control" id="inputZip" />
          </div>
        </div>

         
          <div className="mb-3">
            <label htmlFor="certifications">
              Do you have any direct training, certifications, or experience in
              the job you're interested in?{" "}
            </label>
            <textarea name="certifications" className="form-control"  id="certifications" rows="5" cols="50" ></textarea>
          </div>

           <div className='mb-2'>
                <input className="job_pref me-2" type="checkbox" id="lifeguard" name="lifeguard" />
                <label htmlFor="lifeguard">lifeguard</label>
               
                
              </div>
              <div className='mb-2'>
                <input className="job_pref me-2" type="checkbox" id="swim_instructor" name="swim_instructor" />
                <label htmlFor="swim_instructor">swim instructor</label>
                
              </div>
              <div className='mb-2'>
                <input className="job_pref me-2" type="checkbox" id="camp_counselor" name="camp_counselor" />
                <label htmlFor="camp_counselor">camp counselor</label>
                
              </div>
              <div className='mb-2'>
                <input className="job_pref me-2" type="checkbox" id="park_field_maintenance" name="park_field_maintenance" />
                <label htmlFor="park_field_maintenance">park/field maintenance</label>
                
              </div>
              <div className='mb-2'>
                <input className="job_pref me-2" type="checkbox" id="pool_maintenance" name="pool_maintenance" />
                <label htmlFor="pool_maintenance">pool maintenance</label>
                
              </div>
              <div className='mb-2'>
                <input className="job_pref me-2" type="checkbox" id="golf_ranger" name="golf_ranger" />
                <label htmlFor="golf_ranger">golf ranger</label>
                
              <br />
              </div>
               <div className="form-group mb-3 w-50 my-4">
              <label htmlFor="inputZip">Preferred job location zip code</label>
              <input name="job_zip" type="text" className="form-control" id="inputZip" />
            </div>
          <div className="d-flex flex-row">
            <p className="m-2">
              Do you want to learn more about park and recreation seasonal jobs
              and how to get hired?{" "}
            </p>
            <label className="m-2" htmlFor="yes">
              Yes
            </label>
            <input className="m-2" type="checkbox" id="yes" name="yes" />
            <br />
            <label className="m-2" htmlFor="no">
              No
            </label>
            <input className="m-2" type="checkbox" id="no" name="no" />
            <br />
            <label className="m-2" htmlFor="maybe">
              Maybe Later
            </label>
            <input className="m-2" type="checkbox" id="maybe" name="maybe" />
            <br />
          </div>
          <div className="d-flex flex-row mb-3">
            <p className="m-2">
              What's the best way for us to follow up with you?
            </p>
            <label className="m-2" htmlFor="phone">
              Phone call
            </label>
            <input className="m-2" type="checkbox" id="phone" name="phone" />
            <br />
            <label className="m-2" htmlFor="text">
              Text message
            </label>
            <input className="m-2" type="checkbox" id="text" name="text" />
            <br />
            <label className="m-2" htmlFor="email">
              Email
            </label>
            <input className="m-2" type="checkbox" id="email" name="email" />
            <br />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="social">
              Share your fav social media and handle/username.
            </label>
            <input name="social" type="text" className="form-control" id="social" placeholder="..." />
          </div>
          <div>
            <label htmlFor="other-info">Any else you'd like us to know? </label>
            <textarea name="other_info" className="form-control" id="other_info" rows="5" cols="50" ></textarea>
          </div>
      

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </MDBContainer>
  );
}
