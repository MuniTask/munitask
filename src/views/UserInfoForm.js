import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MDBContainer, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import { Check, Pencil, X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import {db} from '../firebase';

export default function UserInfoForm({user}) {
  const age_array=Array.from({length: 50}, (x, i) => i+15);
  const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
    "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
  const parent_or_child_array=['the parent of a job seeker.', 'a job seeker.'];
  const [redirect, setRedirect]=useState(false);
  const [show, setShow] = useState(false);
  const [choiceOne, setChoiceOne]=useState()
  const [jobRank, setJobRank]=useState([1,2,3,4,5,6])
  const [message, setMessage]=useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const minimum_year_of_birth=()=>{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year-15}-${month}-${day}`;
   return currentDate
  };
  const emptyField=(e)=>{
    e.preventDefault();
    if (e.target.job_pref1.value===''){
      console.log('error!')
    }
  };
  const handleJobPrefChange=(e)=>{
    e.preventDefault();
 
    const new_list=[]
    if (jobRank.includes(e.target.value)){
      new_list.push(e.target.value)
    }
    setJobRank(new_list)

  }
  const writePersonalInfo=async(e)=>{
    if (e.target.pref_1.value==e.target.pref_2.value||e.target.pref_1.value==e.target.pref_3.value||e.target.pref_3.value==e.target.pref_2.value){
      setMessage(true)
    }else{
    e.preventDefault();
    try{

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
        contact_by:e.target.follow_up.value,
        job_zip:e.target.job_zip.value,
        other_info:e.target.other_info.value,
        job_pref_1:e.target.pref_1.value,
        job_pref_2:e.target.pref_2.value,
        job_pref_3:e.target.pref_3.value,
        age:e.target.age.value,
        social_1_pref:e.target.social_1_pref.value,
        social_1_handle:e.target.social_1_handle.value,
        social_2_pref:e.target.social_2_pref.value,
        social_2_handle:e.target.social_2_handle.value,
        student:e.target.student.value

       
    }, {merge:true})
    console.log('succesfully added personal info');
    setRedirect(true);
   handleShow();}catch(error){
    console.log(error)
   }}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      window.dataLayer.push({
        event:'form_submitted',
        'form_name':'personal_info_form',
        'action': 'personal info form complete',
      })
  };
  useEffect(()=>{
    console.log(minimum_year_of_birth())
  })
  return (<div className='page-container'>
  {redirect? <><Navigate to='/'/> </>:<>
    <MDBContainer fluid>
      <div className="check-info-blurb alert alert-warning" role='alert'>
        <div className="d-flex flex-row">
      <Pencil size={20} color='rgb(68, 59, 9)'/>
      <p className="ms-1 p-0 m-0"><b>Please double check your newly entered details.</b> We will use this information to find your best fit.</p>
      </div>
    
      </div>
      <form id='PersonalInfoForm' name='personal_info_form' onSubmit={(e) => {  writePersonalInfo(e); handleSubmit(e)}} >
    <h4 className="my-3">Personal Information</h4>
        <div className="form-row mb-3">
          <div className="form-group d-flex flex-row">
            <div className="w-25 me-4 required">
              <label htmlFor="first_name">First Name</label>
              <input name="first_name" type="text" placeholder="First Name" className="form-control " id="first_name"  required/>
             
            </div>
            <div className="w-25 me-4 required">
              <label htmlFor="last_name">Last Name</label>
             <input name="last_name" type="text" className="form-control " id="last_name" placeholder="Last Name" required/>
              
            </div>
            <div className="w-25 required">
            <label htmlFor="inputEmail4">Email</label>
              {user.email?<><input name="email" type="email" className="form-control" id="inputEmail4" defaultValue={user.email} /></>
              :<><input name="email" type="email" className="form-control" id="inputEmail4" placeholder="Email" /></>}
             
            </div>
          </div>
          <div className="d-flex flex-row required">
            <div className="w-25  mt-3 me-4">
                <label htmlFor="inputTel4">Phone Number</label>
                <input name="phone_number" type="tel" className="form-control" id="inputTel4" placeholder="Phone Number" required/>
              </div>
            <div className="form-group w-25 mt-3 me-4  required">
              <label htmlFor="birthday">Birthday</label>
             <input type="date" className="form-control" id="birthday" name="birthday" min='1970-01-01' max={minimum_year_of_birth()} required/>
            </div>
            <div className="form-group w-25 mt-3 required">
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

        <div className="form-group d-flex flex-row mb-2 required">
          <div className="w-25 me-4">
            <label htmlFor="inputState">State</label>
            <select name="state" id="inputState" className="form-control" required>
              <option disabled>Select</option>
             {states.map((state,i)=><Fragment key={i}>
                <option>{state}</option>
                </Fragment>)}
            </select>
          </div>
          <div className="w-25 me-4 required">
            <label htmlFor="inputCity">City</label>
          <input name="city" type="text" className="form-control" id="inputCity" required/>
           
          </div>
          <div className="w-25 me-4 required">
            <label htmlFor="inputZip">Zip</label>
            <input name="zip" type="text" className="form-control" id="inputZip" required/>
          
          </div>
         
        </div>
        <div className="w-25 me-4 mb-4">
              <p htmlFor="student" className="required-p mb-0 pb-0">Are you a student?</p>
              <div>
              <label htmlFor="student">Yes</label>
              <input className="student_yes" type="radio" id="student" name="student" value={true}/>
              </div>
            <div>
            <label htmlFor="student">No</label>
              <input className="student_no" type="radio" id="student" name="student" value={false} />
            </div>
          </div>

        <h4 className="my-3 required ">Job Preferences</h4>
              <p className='mb-1 required-p'>Select your top 3 job preferences (each choice must be unique):</p>
              {message?<>
                <p style={{color:'red'}}>*Please choose a different job for each choice</p>
              </>:<></>}
            
              <div className='mb-2'>
                  <label htmlFor="pref_1">First choice</label>
                  <select name="pref_1" id="pref_1" className="form-control w-50" onChange={(e)=>handleJobPrefChange(e)} required>
                    <option disabled selected>Select one...</option>
                         <option>Camp Counselor</option>
                         <option>Golf Ranger</option>
                         <option>Lifeguard</option>
                         <option>Park Maintenance</option>
                         <option>Pool Maintenance</option>
                         <option>Swim Instructor</option>
                    </select>
              </div>
              <div className='mb-2'>
                <label htmlFor="pref_2">Second Choice</label>
                <select name="pref_2" id="lifepref_2uard" className="form-control w-50" onChange={(e)=>handleJobPrefChange(e)} required>
                <option disabled selected>Select one...</option>
                         <option>Camp Counselor</option>
                         <option>Golf Ranger</option>
                         <option>Lifeguard</option>
                         <option>Park Maintenance</option>
                         <option>Pool Maintenance</option>
                         <option>Swim Instructor</option>
                    </select>
              </div>
              <div className='mb-2'>
                <label htmlFor="pref_3">Third Choice</label>
                <select name="pref_3" id="pref_3" className="form-control w-50" onChange={(e)=>handleJobPrefChange(e)} required>
                    <option disabled selected>Select one...</option>
                    <option>Camp Counselor</option>
                         <option>Golf Ranger</option>
                         <option>Lifeguard</option>
                         <option>Park Maintenance</option>
                         <option>Pool Maintenance</option>
                         <option>Swim Instructor</option>
                    </select>
              </div>
             
            <div className="form-group mb-3 w-50 my-4 required">
              <label htmlFor="inputZip">Preferred job location zip code</label>
              <input name="job_zip" type="text" className="form-control" id="inputZip" required/>
            </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-1 required-p">
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
            <p className="mb-1 required-p">
              What's the best way for us to follow up with you?
            </p>
            
            <select name="follow_up" id="followUp" className="form-control w-50" required>
              <option disabled>Select one...</option>
                <option>Phone call</option>
                <option>Email</option>
                <option>Text</option>
                <option>Social media</option>
            </select>
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="social">
            Please share a social media handles or usernames
            </label>
            <div className="d-flex flex-row mb-2">
            <select name="social_1_pref" id="social1Pref" className="form-control w-25 me-3" required>
                <option disabled selected>Select one...</option>
                         <option>BeReal</option>
                         <option>Facebook</option>
                         <option>Instagram</option>
                         <option>LinkedIn</option>
                         <option>TikTok</option>
                         <option>Twitter</option>
                    </select>
                    <input name='social_1_handle' type="text" id='social1' className="w-50"/>
                    </div>
                <div className="d-flex flex-row">
                    <select name="social_2_pref" id="social2Pref" className="form-control w-25 me-3"  required>
                <option disabled selected>Select one...</option>
                <option>BeReal</option>
                         <option>Facebook</option>
                         <option>Instagram</option>
                         <option>LinkedIn</option>
                         <option>TikTok</option>
                         <option>Twitter</option>
                    </select>
                    <input name='social_2_handle' type="text" id='social2' className="w-50"/>
                    </div>
          </div>
          <div>
            <label htmlFor="other-info">Is there anything else you'd like us to know about you?</label>
              <textarea name="other_info" className="form-control" id="other_info" rows="5" cols="50" ></textarea>
          </div>
      

        {/* <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button> */}
        <Button variant="success" className='mt-4' data-testid='updateProfileInfoBtn' type="submit" >
        Save Changes
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Your personal information has been succesfully updated!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </form>
      {/* </>} */}
     
    </MDBContainer>
    </>} </div> )
}
