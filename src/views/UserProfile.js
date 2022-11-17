import { MDBCol, MDBTabs, MDBTabsLink, MDBTabsItem, MDBRow, MDBContainer, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react';
import {db} from '../firebase';
// import { getDatabase, ref, onValue, set} from "firebase/database";
import { collection, addDoc, getDocs} from "firebase/firestore";
import InterestForm from '../components/InterestForm';
import ProfileNav from '../components/ProfileNav';


export default function UserProfile({user}) {
    const [verticalActive, setVerticalActive] = useState('tab1');
    const [forms, setForms]=useState([])

    const parksRef = collection(db, 'interestForms');
   
    
    const getInterestForms=async()=>{
      const data = await getDocs(collection(db, 'interestForms/'));
    
      console.log(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
      setForms(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
    }
    const writeInterestForm = async(e)=> {
        e.preventDefault()
        
        let more_info=[];
        if (e.target.yes.checked===true){
          more_info='yes'
        } else{
          more_info='no'
        };
        const contact=[];
        if (e.target.phone.checked===true){
          contact.push('phone')
          
        } 
        if (e.target.text.checked===true){
          contact.push('text')
        } if(e.target.email.checked===true){
          contact.push('email')
        };
   
        await addDoc(collection(db, "interestForms/"), {
          user_uid:user.uid,
          first_name:e.target.first_name.value,
          last_name:e.target.last_name.value,
          birthday:e.target.birthday.value,
          email:e.target.email.value,
          state:e.target.state.value,
          city:e.target.city.value,
          zip:e.target.zip.value,
          preferred_location:e.target.job_zip.value,
          job_start:e.target.job_start.value,
          job_end:e.target.job_end.value,
          lifeguard:e.target.lifeguard.checked,
          swim_instructor:e.target.swim_instructor.checked,
          camp_counselor:e.target.camp_counselor.checked,
          park_field_maintenance:e.target.park_field_maintenance.checked,
          pool_maintenance:e.target.pool_maintenance.checked,
          golf_ranger:e.target.golf_ranger.checked,
          more_info:more_info,
          contact_by:contact,
          training: e.target.certifications.value,
          social: e.target.social.value,
          other_info:e.target.other_info.value
        });
      }
    
    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
          return;
        }
        setVerticalActive(value);
      };
    
  return (
    <MDBContainer className='p-0 profile-container mt-5' fluid>
        <MDBRow>
        <MDBCol size='3'>
          <MDBTabs className='flex-column text-center'>
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab' onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Settings
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab' onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                Saved Jobs
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab' onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
                Interests
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent className='mt-5 '>
            <MDBTabsPane show={verticalActive === 'tab1'}>
            <h4 className='display-5 '>Settings</h4>
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}>
            <h4 className='display-5 '>Saved Jobs</h4>
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab3'}>
                <h4 className='display-5 '>Interests and Personal Information</h4>
                <InterestForm writeInterestForm={writeInterestForm}/>
                </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
