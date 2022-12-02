import { MDBCol, MDBTabs, MDBTabsLink, MDBTabsItem, MDBRow, MDBContainer, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react';
import {db} from '../firebase';
// import { getDatabase, ref, onValue, set} from "firebase/database";
import { collection, addDoc, getDocs, updateDoc, doc} from "firebase/firestore";


import SavedJobs from '../components/SavedJobs';
import PersonalInfo from '../components/PersonalInfo';
import { GearSix, Heart, User } from 'phosphor-react';
import Settings from '../components/Settings';


export default function UserProfile({user}) {
    const [verticalActive, setVerticalActive] = useState('tab1');
    const [forms, setForms]=useState([])

    const parksRef = collection(db, 'interestForms');
   
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
          contact_by:contact[0],
          social: e.target.social.value,
          other_info:e.target.other_info.value,
           lifeguard:e.target.lifeguard.checked,
        swim_instructor:e.target.swim_instructor.checked,
        camp_counselor:e.target.camp_counselor.checked,
        park_field_maintenance:e.target.park_field_maintenance.checked,
        pool_maintenance:e.target.pool_maintenance.checked,
        golf_ranger:e.target.golf_ranger.checked,
      }, {merge:true})
      console.log('succesfully added personal info')
     
    }
   
    
    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
          return;
        }
        setVerticalActive(value);
      };
    
  return (
    <MDBContainer className='p-0 profile-container ' fluid>
        <MDBRow>
        <MDBCol size='3' className='sidenav-div'>
          <MDBTabs className='flex-column mt-5'>
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab' onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
              <GearSix size={20} className='me-2'/>Settings
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab mt-2' onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
              <User size={20} className='me-2'/>Personal Information
              </MDBTabsLink>
            </MDBTabsItem>
         
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab mt-2' onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
              <Heart size={20} className='me-2'/>Saved Jobs
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
          
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent className='mt-5 '>
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab1'}>
            <h4 className='display-5 mb-5 ms-5'>Settings</h4>
            <Settings user={user}/>
            </MDBTabsPane>
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab2'}>
                <h4 className='display-5 mb-5'>Personal Info</h4>
                <PersonalInfo user={user} writePersonalInfo={writePersonalInfo}/>
            </MDBTabsPane>
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab3'}>
            <h4 className='display-5 mb-5'>Saved Jobs</h4>
            <SavedJobs user={user}/>
            </MDBTabsPane>
          
            
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
