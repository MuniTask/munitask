import { doc, getDoc } from "firebase/firestore";
import { MDBContainer, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import { Check, X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import {db} from '../firebase';
export default function PersonalInfo({ writePersonalInfo, user }) {
  const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
    "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
  const [startDate, setStartDate] = useState(new Date());
  const [currentUser, setCurrentUser]=useState({});
  const [text, setText]=useState(false);
  const [call, setCall]=useState(false);
  const [email, setEmail]=useState(false);
  const age_array=Array.from({length: 85}, (x, i) => i);
  const parent_or_child_array=['the parent of a job seeker.', 'a job seeker.']
  const illinois_cities = [];
  const [data, setData]=useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



const contactBy=()=>{
    if (currentUser.contact_by==='phone'){
      setCall(true)
    }
    else if (currentUser.contact_by==='text'){
      setText(true)
    }
    else if (currentUser.contact_by==='email'){
      setEmail(true)
    }
  };

  const getUser=async(user)=>{
        const docRef=doc(db,'users',user.uid)
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        setCurrentUser(docSnap.data())
      };

  const handleChange = (e) => {
      setData({ ...currentUser, [e.target.name]: e.target.value });
    };

  const handleSubmit = (e) => {
      e.preventDefault();
        let complete=true;
        let percent_complete=0;
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
            contact.push('')
          };
          const job_pref_list=[e.target.lifeguard.checked, 
            e.target.swim_instructor.checked, 
            e.target.camp_counselor.checked, 
            e.target.park_field_maintenance.checked,
            e.target.pool_maintenance.checked,
            e.target.golf_ranger.checked];
          if (job_pref_list.includes(true)){
            percent_complete++
          }
         
          const datalayer_list=[
            e.target.phone_number.value,
            contact[0],
            e.target.job_zip.value,
            e.target.social.value,
            e.target.other_info.value,
            e.target.parent_or_child.value
          ]
        for (let x of datalayer_list){
          if (x !=='' && x!== null && x!== undefined){
            percent_complete++
          }
        }
        console.log('percent complete:', `${Math.round(percent_complete/.15)}%`)    
        console.log('succesfully added personal info')
        window.dataLayer.push({
          event:'form_submitted',
          'form_name':'personal_info_form',
          'percent_complete': `${Math.round(percent_complete/.15)}%`,
        })
    };

  useEffect(()=>{
    getUser(user); 
    contactBy();
  },[])

  return (
    <MDBContainer fluid>
      <form id='PersonalInfoForm' name='personal_info_form' onSubmit={(e) => {  writePersonalInfo(e); handleSubmit(e)}} >
  
        {/* <div className="form-row mb-3">
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
          <div className="d-flex flex-row">
            <div className="w-25  mt-3 me-4">
                <label htmlFor="inputTel4">Phone Number</label>
                {currentUser.phone_number?<><input name="phone_number" type="tel" className="form-control" id="inputTel4" defaultValue={currentUser.phone_number} onChange={handleChange}/></>
                :<><input name="phone_number" type="tel" className="form-control" id="inputTel4" placeholder="Phone Number" /></>}
              </div>
            <div className="form-group w-25 mt-3 me-4 ">
              <label htmlFor="birthday">Birthday</label>
              {currentUser.birthday?<><input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" defaultValue={currentUser.birthday} onChange={handleChange}/></>
              :<><input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" /></>}
            </div>
            <div className="form-group w-25 mt-3">
            <label htmlFor="age">Age of job seeker</label>
            <select name="age" id="inputAge" className="form-control w-50">
              {currentUser.age?<>
                <option>{currentUser.age}</option>
                {age_array.map((age,i)=><Fragment key={i}>
              <option>{age}</option>
              </Fragment>)}</>
              :<>{age_array.map((age,i)=><Fragment key={i}>
                <option>{age}</option>
                </Fragment>)}</>}
            </select>
            </div>
            </div>
        </div>

        <div className="form-group d-flex flex-row mb-5">
          <div className="w-25 me-4">
            <label htmlFor="inputState">State</label>
            <select name="state" id="inputState" className="form-control">
              {currentUser.state?<>
                <option>{currentUser.state}</option>
                {states.map((state,i)=><Fragment key={i}>
              <option>{state}</option>
              </Fragment>)}</>
              :<>{states.map((state,i)=><Fragment key={i}>
                <option>{state}</option>
                </Fragment>)}</>}
            </select>
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputCity">City</label>
            {currentUser.city?<> <input name="city" type="text" className="form-control" id="inputCity" defaultValue={currentUser.city} onChange={handleChange}/>
            </>:<> <input name="city" type="text" className="form-control" id="inputCity" /></>}
           
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputZip">Zip</label>
            {currentUser.zip?<>  <input name="zip" type="text" className="form-control" id="inputZip" defaultValue={currentUser.zip} onChange={handleChange}/></>
            :<>  <input name="zip" type="text" className="form-control" id="inputZip" /></>}
          
          </div>
        </div> */}

              <p className='mb-1'>Select jobs that interest you:</p>
              <div className='mb-2'>
                  {currentUser.lifeguard?<><input className="job_pref me-2" type="checkbox" id="lifeguard" name="lifeguard" defaultChecked='checked' onChange={handleChange}/></>
                  :<><input className="job_pref me-2" type="checkbox" id="lifeguard" name="lifeguard" /></>}
                  <label htmlFor="lifeguard">lifeguard</label>
              </div>
              <div className='mb-2'>
              {currentUser.swim_instructor?<><input className="job_pref me-2" type="checkbox" id="swim_instructor" name="swim_instructor" defaultChecked='checked' onChange={handleChange}/></>
              :<><input className="job_pref me-2" type="checkbox" id="swim_instructor" name="swim_instructor" /></>}
                
                <label htmlFor="swim_instructor">swim instructor</label>
                
              </div>
              <div className='mb-2'>
              {currentUser.camp_counselor?<> <input className="job_pref me-2" type="checkbox" id="camp_counselor" name="camp_counselor" defaultChecked='checked' onChange={handleChange}/></>
              :<> <input className="job_pref me-2" type="checkbox" id="camp_counselor" name="camp_counselor" /></>}
               
                <label htmlFor="camp_counselor">camp counselor</label>
                
              </div>
              <div className='mb-2'>
              {currentUser.park_field_maintenance?<><input className="job_pref me-2" type="checkbox" id="park_field_maintenance" name="park_field_maintenance" defaultChecked='checked' onChange={handleChange}/></>
              :<><input className="job_pref me-2" type="checkbox" id="park_field_maintenance" name="park_field_maintenance" /></>}
                <label htmlFor="park_field_maintenance">park/field maintenance</label>
                
              </div>
              <div className='mb-2'>
              {currentUser.pool_maintenance?<> <input className="job_pref me-2" type="checkbox" id="pool_maintenance" name="pool_maintenance" defaultChecked='checked' onChange={handleChange}/></>
              :<> <input className="job_pref me-2" type="checkbox" id="pool_maintenance" name="pool_maintenance" /></>}
                <label htmlFor="pool_maintenance">pool maintenance</label>
                
              </div>
              <div className='mb-2'>
              {currentUser.golf_ranger?<> <input className="job_pref me-2" type="checkbox" id="golf_ranger" name="golf_ranger"  defaultChecked='checked' onChange={handleChange}/></>
              :<> <input className="job_pref me-2" type="checkbox" id="golf_ranger" name="golf_ranger" /></>}
                <label htmlFor="golf_ranger">golf ranger</label>
                
              <br />
              </div>
            <div className="form-group mb-3 w-50 my-4">
              <label htmlFor="inputZip">Preferred job location zip code</label>
              {currentUser.job_zip?<><input name="job_zip" type="text" className="form-control" id="inputZip" defaultValue={currentUser.job_zip} onChange={handleChange}/></>
              :<><input name="job_zip" type="text" className="form-control" id="inputZip" /></>}
              
            </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-1">
             I am...
            </p>
            <div>
            <select name="parent_or_child" id="inputParentorChild" className="form-control w-50">
              {currentUser.parent_or_child?<>
                <option>{currentUser.parent_or_child}</option>
                {parent_or_child_array.map((PorC,i)=><Fragment key={i}>
              <option>{PorC}</option>
              </Fragment>)}</>
              :<>
              <option>Select one...</option>
              {parent_or_child_array.map((PorC,i)=><Fragment key={i}>
                <option>{PorC}</option>
                </Fragment>)}</>}
            </select>
            </div>
          </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-1">
              What's the best way for us to follow up with you?
            </p>
            <div>
                {currentUser.contact_by?<>
                {call?<><input className="" type="checkbox" id="phone" name="phone" onChange={handleChange} defaultChecked='checked'/></>:<><input className="" type="checkbox" id="phone" name="phone" /></>}
                </>:<><input className="" type="checkbox" id="phone" name="phone" /></>}
                <label className="ms-2" htmlFor="phone">
                  Phone call
                </label>
            </div>
            <div>
                {currentUser.contact_by?<>
                {text?<><input className="" type="checkbox" id="text" name="text" onChange={handleChange} defaultChecked='checked'/></>:<><input className="" type="checkbox" id="text" name="text" /></>}
                </>:<><input className="" type="checkbox" id="text" name="text" /></>}
                <label className="ms-2" htmlFor="text">
                  Text message
                </label>
            </div>
            <div>
                {currentUser.contact_by?<>
                {email?<><input className="" type="checkbox" id="email" name="email" onChange={handleChange} defaultChecked='checked'/></>:<><input className="" type="checkbox" id="email" name="email" /></>}
                </>:<><input className="" type="checkbox" id="email" name="email" /></>}
                <label className="ms-2" htmlFor="email">
                  Email
                </label>
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="social">
            Please share a social media handle or username
            </label>
            {currentUser.social?<><input name="social" type="text" className="form-control" id="social" placeholder="..." defaultValue={currentUser.social} onChange={handleChange}/></>
              :<><input name="social" type="text" className="form-control" id="social" placeholder="..." /></>}
            
          </div>
          <div>
            <label htmlFor="other-info">Is there anything else you'd like us to know about you?</label>
            {currentUser.other_info?<> <textarea name="other_info" className="form-control" id="other_info" rows="5" cols="50" defaultValue={currentUser.other_info} onChange={handleChange}></textarea></>
            :<>
              <textarea name="other_info" className="form-control" id="other_info" rows="5" cols="50" ></textarea></>}
          
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
  );
}
