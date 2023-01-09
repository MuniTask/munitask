import { doc, getDoc } from "firebase/firestore";
import { MDBContainer} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import {db} from '../firebase';
export default function PersonalInfo({ writePersonalInfo, user }) {
  // const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
  //   "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
  //   "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
  //   "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
  // const [startDate, setStartDate] = useState(new Date());
  const [currentUser, setCurrentUser]=useState({});
  const [text, setText]=useState(false);
  const [call, setCall]=useState(false);
  const [email, setEmail]=useState(false);
  const [parent, setParent]=useState(false)
  // const age_array=Array.from({length: 50}, (x, i) => i+15);
  const parent_or_child_array=['the parent of a job seeker.', 'a job seeker.']
  // const illinois_cities = [];
  const [data, setData]=useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);





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
        window.dataLayer.push({
          event:'form_submitted',
          'form_name':'personal_info_form',
          'action': `form updated`,
        })
    };

  useEffect(()=>{
    getUser(user); 

    if (currentUser.parent_or_child==='the parent of a job seeker.'){
      setParent(true)
    }
  },[])

  return (
    <MDBContainer fluid>
      <form id='PersonalInfoForm' name='personal_info_form' onSubmit={(e) => {  writePersonalInfo(e); handleSubmit(e)}} >
  
     

              <p className='mb-1'>Select jobs that interest you:</p>
              <div className='mb-2'>
                  <label htmlFor="pref_1">First choice</label>
                  <select value={currentUser.job_pref_1} name="pref_1" id="pref_1" className="form-control w-50" onChange={(e)=>handleChange(e)} required>
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
                <select value={currentUser.job_pref_2} name="pref_2" id="lifepref_2uard" className="form-control w-50" onChange={(e)=>handleChange(e)} required>
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
                <select value={currentUser.job_pref_3} name="pref_3" id="pref_3" className="form-control w-50" onChange={(e)=>handleChange(e)} required>
                    <option disabled selected>Select one...</option>
                    <option>Camp Counselor</option>
                         <option>Golf Ranger</option>
                         <option>Lifeguard</option>
                         <option>Park Maintenance</option>
                         <option>Pool Maintenance</option>
                         <option>Swim Instructor</option>
                    </select>
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
              {parent?<>
                <option selected>the parent of a job seeker.</option>
                <option>a job seeker.</option>
                </>
              :<>
               <option>the parent of a job seeker.</option>
                <option selected>a job seeker.</option></>}
            </select>
            </div>
          </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-1 required-p">
              What's the best way for us to follow up with you?
            </p>
            
            <select value={currentUser.contact_by} name="follow_up" onChange={handleChange} id="followUp" className="form-control w-50" required>
              <option disabled>Select one...</option>
              <option>Phone call</option>
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
            <select value={currentUser.social_1_pref} name="social_1_pref" id="social1Pref" className="form-control w-25 me-3" required>
                <option disabled >Select one...</option>
                         <option>BeReal</option>
                         <option>Facebook</option>
                         <option>Instagram</option>
                         <option>LinkedIn</option>
                         <option>TikTok</option>
                         <option>Twitter</option>
                    </select>
                    <input name='social_1_handle' value={currentUser.social_1_handle} type="text" id='social1' className="w-50"/>
                    </div>
                <div className="d-flex flex-row">
                    <select value={currentUser.social_2_pref} name="social_2_pref" id="social2Pref" className="form-control w-25 me-3"  required>
                <option disabled >Select one...</option>
                <option>BeReal</option>
                         <option>Facebook</option>
                         <option>Instagram</option>
                         <option>LinkedIn</option>
                         <option>TikTok</option>
                         <option>Twitter</option>
                    </select>
                    <input value={currentUser.social_2_handle} name='social_2_handle' type="text" id='social2' className="w-50"/>
                    </div>
          </div>
          <div>
            <label htmlFor="other-info">Is there anything else you'd like us to know about you?</label>
              <textarea name="other_info" value={currentUser.other_info} className="form-control" id="other_info" rows="5" cols="50" ></textarea>
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
