import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MDBContainer, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import { Check, X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import {db} from '../firebase';

export default function UserInfoForm({user}) {
  const age_array=Array.from({length: 85}, (x, i) => i);
  const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
    "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
  const parent_or_child_array=['the parent of a job seeker.', 'a job seeker.'];
  const [redirect, setRedirect]=useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const writePersonalInfo=async(e)=>{
    const contact=[];
      if (e.target.phone.checked===true){
        contact.push('phone')
        
      } 
      if (e.target.text.checked===true){
        contact.push('text')
      } if(e.target.email.checked===true){
        contact.push('email')
      };
      if (!e.target.email.checked && !e.target.phone.checked && !e.target.text.checked){
        contact.push('No response')
      }
    e.preventDefault();
    const userRef=doc(db,"users",user.uid)
    await updateDoc(userRef,{
      first_name:e.target.first_name.value,
        last_name:e.target.last_name.value,
        birthday:e.target.birthday.value,
        email:e.target.email.value,
        state:e.target.state.value,
        city:e.target.city.value,
        zip:e.target.zip.value,
        phone_number:e.target.phone_number.value,
        parent_or_child: e.target.parent_or_child.value,
        contact_by:contact[0],
        job_zip:e.target.job_zip.value,
        social: e.target.social.value,
        other_info:e.target.other_info.value,
        lifeguard:e.target.lifeguard.checked,
        swim_instructor:e.target.swim_instructor.checked,
        camp_counselor:e.target.camp_counselor.checked,
        park_field_maintenance:e.target.park_field_maintenance.checked,
        pool_maintenance:e.target.pool_maintenance.checked,
        golf_ranger:e.target.golf_ranger.checked,
        age:e.target.age.value,
       
    }, {merge:true})
    console.log('succesfully added personal info');
    setRedirect(true);
   
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //     let complete=true;
  //     let percent_complete=0;
  //     const contact=[];
  //       if (e.target.phone.checked===true){
  //         contact.push('phone')
  //       } 
  //       if (e.target.text.checked===true){
  //         contact.push('text')
  //       } if(e.target.email.checked===true){
  //         contact.push('email')
  //       };
  //       if (!e.target.email.checked && !e.target.phone.checked && !e.target.text.checked){
  //         contact.push('')
  //       };
  //       const job_pref_list=[e.target.lifeguard.checked, 
  //         e.target.swim_instructor.checked, 
  //         e.target.camp_counselor.checked, 
  //         e.target.park_field_maintenance.checked,
  //         e.target.pool_maintenance.checked,
  //         e.target.golf_ranger.checked];
  //       if (job_pref_list.includes(true)){
  //         percent_complete++
  //       }
  //       const datalayer_list=[e.target.first_name.value,
  //         e.target.last_name.value,
  //         e.target.birthday.value,
  //         e.target.email.value,
  //         e.target.state.value,
  //         e.target.city.value,
  //         e.target.zip.value,
  //         e.target.phone_number.value,
  //         contact[0],
  //         e.target.job_zip.value,
  //         e.target.social.value,
  //         e.target.other_info.value,
  //         e.target.age.value,
  //         e.target.parent_or_child.value
  //       ]
  //     for (let x of datalayer_list){
  //       if (x !=='' && x!== null && x!== undefined){
  //         percent_complete++
  //       }
  //     }
  //     console.log('percent complete:', `${Math.round(percent_complete/.15)}%`)    
  //     console.log('succesfully added personal info')
  //     window.dataLayer.push({
  //       event:'form_submitted',
  //       'form_name':'personal_info_form',
  //       'percent_complete': `${Math.round(percent_complete/.15)}%`,
  //     })
  // };
  return (<>
  {redirect? <><Navigate to='/'/> </>:<>
    <MDBContainer fluid>
      <form id='PersonalInfoForm' name='personal_info_form' onSubmit={(e) => {  writePersonalInfo(e)}} >
    <h4 className="my-3">Personal Information</h4>
        <div className="form-row mb-3">
          <div className="form-group d-flex flex-row">
            <div className="w-25 me-4">
              <label htmlFor="first_name">First Name</label>
              <input name="first_name" type="text" placeholder="First Name" className="form-control " id="first_name"  required/>
             
            </div>
            <div className="w-25 me-4">
              <label htmlFor="last_name">Last Name</label>
             <input name="last_name" type="text" className="form-control " id="last_name" placeholder="Last Name" required/>
              
            </div>
            <div className="w-25">
            <label htmlFor="inputEmail4">Email</label>
              {user.email?<><input name="email" type="email" className="form-control" id="inputEmail4" defaultValue={user.email} /></>
              :<><input name="email" type="email" className="form-control" id="inputEmail4" placeholder="Email" /></>}
             
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="w-25  mt-3 me-4">
                <label htmlFor="inputTel4">Phone Number</label>
                <input name="phone_number" type="tel" className="form-control" id="inputTel4" placeholder="Phone Number" required/>
              </div>
            <div className="form-group w-25 mt-3 me-4 ">
              <label htmlFor="birthday">Birthday</label>
             <input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" required/>
            </div>
            <div className="form-group w-25 mt-3">
            <label htmlFor="age">Age of job seeker</label>
            <select name="age" id="inputAge" className="form-control w-50" required>
              <option disabled>Age</option>
              {age_array.map((age,i)=><Fragment key={i}>
                <option >{age}</option>
                </Fragment>)}
            </select>
            </div>
            </div>
        </div>

        <div className="form-group d-flex flex-row mb-5">
          <div className="w-25 me-4">
            <label htmlFor="inputState">State</label>
            <select name="state" id="inputState" className="form-control" required>
              <option disabled>Select</option>
             {states.map((state,i)=><Fragment key={i}>
                <option>{state}</option>
                </Fragment>)}
            </select>
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputCity">City</label>
          <input name="city" type="text" className="form-control" id="inputCity" required/>
           
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputZip">Zip</label>
            <input name="zip" type="text" className="form-control" id="inputZip" required/>
          
          </div>
        </div>
        <h4 className="my-3">Personal Preferences</h4>
              <p className='mb-1'>Select jobs that interest you:</p>
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
              <input name="job_zip" type="text" className="form-control" id="inputZip" required/>
            </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-1">
             I am...
            </p>
            <div>
            <select name="parent_or_child" id="inputParentorChild" className="form-control w-50" required>
              <option disabled>Select one...</option>
              {parent_or_child_array.map((PorC,i)=><Fragment key={i}>
                <option>{PorC}</option>
                </Fragment>)}
            </select>
            </div>
          </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-1">
              What's the best way for us to follow up with you?
            </p>
            <div>
               <input className="" type="checkbox" id="phone" name="phone" />
                <label className="ms-2" htmlFor="phone">
                  Phone call
                </label>
            </div>
            <div>
               <input className="" type="checkbox" id="text" name="text" />
                <label className="ms-2" htmlFor="text">
                  Text message
                </label>
            </div>
            <div>
               <input className="" type="checkbox" id="email" name="email" defaultChecked/>
                <label className="ms-2" htmlFor="email">
                  Email
                </label>
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="social">
            Please share a social media handle or username
            </label>
           <input name="social" type="text" className="form-control" id="social" placeholder="..." required/>
          </div>
          <div>
            <label htmlFor="other-info">Is there anything else you'd like us to know about you?</label>
              <textarea name="other_info" className="form-control" id="other_info" rows="5" cols="50" required></textarea>
          </div>
      

        {/* <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button> */}
        <Button variant="success" className='mt-4' type="submit" onClick={handleShow}>
        Save Changes
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Your personal information has been succesfully updated!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" data-testid='update-profile-info-btn' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </form>
      {/* </>} */}
     
    </MDBContainer>
    </>} </> )
}
