import { doc, getDoc } from "firebase/firestore";
import { MDBContainer, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import { Check, X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import {db} from '../firebase';
export default function PersonalInfo({ writePersonalInfo, user }) {
  const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
    "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
  const [startDate, setStartDate] = useState(new Date());
  const [currentUser, setCurrentUser]=useState({})
  const [edit, setEdit]=useState(false)
  const [text, setText]=useState(false)
  const [call, setCall]=useState(false)
  const [email, setEmail]=useState(false)
  const illinois_cities = [];

  const [data, setData]=useState({})

  const handleEdit=()=>{
    if (currentUser.birthday){
      setEdit(true);
      contactBy();
    }
  };
  const handleCancelEdit=()=>{
    if (currentUser.birthday){
      setEdit(false);
    }
  };
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
    setEdit(false);
  };
useEffect(()=>{
  getUser();
 
},[edit])
  return (
    <MDBContainer fluid>
      {!edit? <>
      
        <div>
          <p className="edit-btn" onClick={handleEdit}>edit</p>
        <div className="form-row mb-3">
          <div className="form-group d-flex flex-row">
            <div className="w-25 me-4">
              <h6>First Name</h6>
              {currentUser.first_name?<> <p>{currentUser.first_name}</p></>
              :<> <p>No response</p></>}
             
            </div>
            <div className="w-25 me-4">
              <h6>Last Name</h6>
              {currentUser.last_name?<><p>{currentUser.last_name}</p></>
              :<><p>No response</p></>}
              
            </div>
            <div className="w-25">
            <h6>Email</h6>
            {currentUser.email?<><p>{currentUser.email}</p></>
              :<><p>No response</p></>}
             
            </div>
          </div>
          <div className="d-flex flex-row">
              <div className="w-25 mt-3">
                <h6>Phone number</h6>
                {currentUser.phone_number?<><p>{currentUser.phone_number}</p></>
                  :<><p>No response</p></>}
                
                </div>
              <div className="form-group col-md-2 mt-3">
              <h6>Birthday</h6>
              {currentUser.birthday?<><p>{currentUser.birthday}</p></>
                :<><p>No response</p></>}
              
              </div>
          </div>
        </div>

        <div className="form-group d-flex flex-row mb-5">
          <div className="w-25 me-4">
            <h6>State</h6>
            {currentUser.state?<><p>{currentUser.state}</p></>
            :<><p>No response</p></>}
          </div>
          <div className="w-25 me-4">
          <h6>city</h6>
            {currentUser.city?<><p>{currentUser.city}</p></>
            :<><p>No response</p></>}
          </div>
          <div className="w-25 me-4">
          <h6>Zip Code</h6>
            {currentUser.zip?<><p>{currentUser.zip}</p></>
            :<><p>No response</p></>}
          </div>
        </div>

         
        
           <div className='mb-2'>
               {currentUser.lifeguard?<>
                <Check size={24} className='me-2'/>
                <label htmlFor="lifeguard">lifeguard</label>
                </>:<>
                <X size={24} className='me-2'/>
                <label htmlFor="lifeguard">lifeguard</label>
                </>}
               
                
              </div>
              <div className='mb-2'>
              {currentUser.swim_instructor?<>
                <Check size={24} className='me-2'/>
                <label htmlFor="swim_instructor">swim instructor</label>
                </>:<>
                <X size={24} className='me-2'/>
                <label htmlFor="swim_instructor">swim instructor</label>
                </>}
               
              </div>
              <div className='mb-2'>
                {currentUser.camp_counselor?<>
                <Check size={24} className='me-2'/>
                <label htmlFor="camp_counselor">camp counselor</label>
                </>:<>
                <X size={24} className='me-2'/>
                <label htmlFor="camp_counselor">camp counselor</label>
                </>}
              </div>
              <div className='mb-2'>
                {currentUser.park_field_maintenance?<>
                <Check size={24} className='me-2'/>
                <label htmlFor="park_field_maintenance">park/field maintenance</label>
                </>:<>
                <X size={24} className='me-2'/>
                <label htmlFor="park_field_maintenance">park/field maintenance</label>
                </>}
              </div>
              <div className='mb-2'>
                {currentUser.pool_maintenance?<>
                <Check size={24} className='me-2'/>
                <label htmlFor="pool_maintenance">pool maintenance</label>
                </>:<>
                <X size={24} className='me-2'/>
                <label htmlFor="pool_maintenance">pool maintenance</label>
                </>}
              </div>
              <div className='mb-2'>
                {currentUser.golf_ranger?<>
                <Check size={24} className='me-2'/>
                <label htmlFor="golf_ranger">golf ranger</label>
                </>:<>
                <X size={24} className='me-2'/>
                <label htmlFor="golf_ranger">golf ranger</label>
                </>}
              <br />
              </div>
          <div className="form-group mb-3 w-50 my-4">
              <h6>Preferred job location zip code</h6>
            {currentUser.job_zip?<><p>{currentUser.job_zip}</p></>
            :<><p>No response</p></>}
            </div>
         
          <div className="">
          <h6>What is the best way for us to follow up with you?</h6>
            {currentUser.contact_by?<><p>{currentUser.contact_by}</p></>
            :<><p>No response</p></>}
          </div>
          <div className="form-group col-md-6 mb-3">
          <h6>Please share a social media handle or username.</h6>
            {currentUser.social?<><p>{currentUser.social}</p></>
            :<><p>No response</p></>}
          </div>
          <div>
          <h6>Is there anything else you'd like us to know about you?</h6>
            {currentUser.other_info?<><p>{currentUser.other_info}</p></>
            :<><p>No response</p></>}
          </div>
      </div>

      
      </>:<>
      <form onSubmit={(e) => {  writePersonalInfo(e); handleSubmit(e)}} >
      <p className="edit-btn" onClick={handleCancelEdit}>cancel</p>
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
          <div className="d-flex flex-row">
            <div className="w-25  mt-3 me-4">
                <label htmlFor="inputTel4">Phone Number</label>
                {currentUser.phone_number?<><input name="phone_number" type="tel" className="form-control" id="inputTel4" defaultValue={currentUser.phone_number} onChange={handleChange}/></>
                :<><input name="phone_number" type="tel" className="form-control" id="inputTel4" placeholder="Phone Number" /></>}
              </div>
            <div className="form-group w-25 mt-3 ">
              <label htmlFor="birthday">Birthday</label>
              {currentUser.birthday?<><input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" defaultValue={currentUser.birthday} onChange={handleChange}/></>
              :<><input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" /></>}
            </div>
            </div>
        </div>

        <div className="form-group d-flex flex-row mb-5">
          <div className="w-25 me-4">
            <label htmlFor="inputState">State</label>
            <select name="state" id="inputState" className="form-control">
              {currentUser.state?<>
                <option>{currentUser.state}</option>
                {states.map((state,i)=><>
              <option>{state}</option>
              </>)}</>
              :<>{states.map((state,i)=><>
                <option>{state}</option>
                </>)}</>}
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
        </div>


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
          
          <div className="d-flex flex-row mb-3">
            <p className="m-2">
              What's the best way for us to follow up with you?
            </p>
            <label className="m-2" htmlFor="phone">
              Phone call
            </label>
            {currentUser.contact_by?<>
            {call?<><input className="m-2" type="checkbox" id="phone" name="phone" onChange={handleChange} defaultChecked='checked'/></>:<><input className="m-2" type="checkbox" id="phone" name="phone" /></>}
            </>:<><input className="m-2" type="checkbox" id="phone" name="phone" /></>}
            <br />
            <label className="m-2" htmlFor="text">
              Text message
            </label>
            {currentUser.contact_by?<>
            {text?<><input className="m-2" type="checkbox" id="text" name="text" onChange={handleChange} defaultChecked='checked'/></>:<><input className="m-2" type="checkbox" id="text" name="text" /></>}
            </>:<><input className="m-2" type="checkbox" id="text" name="text" /></>}
            <br />
            <label className="m-2" htmlFor="email">
              Email
            </label>
            {currentUser.contact_by?<>
            {email?<><input className="m-2" type="checkbox" id="email" name="email" onChange={handleChange} defaultChecked='checked'/></>:<><input className="m-2" type="checkbox" id="email" name="email" /></>}
            </>:<><input className="m-2" type="checkbox" id="email" name="email" /></>}
            <br />
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
      

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
      </>}
     
    </MDBContainer>
  );
}
