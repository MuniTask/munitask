import { MDBCol, MDBTabs, MDBTabsLink, MDBTabsItem, MDBRow, MDBContainer, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react';
import {db} from '../firebase';
import { collection,  updateDoc, doc, getDoc} from "firebase/firestore";
import SavedJobs from '../components/SavedJobs';
import PersonalInfo from '../components/PersonalInfo';
import { GearSix, Heart, ListChecks, User } from 'phosphor-react';
import Settings from '../components/Settings';
import SubmittedInterests from '../components/SubmittedInterests';
// import ReactGA from 'react-ga';


export default function UserProfile({user,setUser, incrementLogin, signUserOut, createPopUp}) {
    const [verticalActive, setVerticalActive] = useState('tab1');
    const [forms, setForms]=useState([]);
    const [redirect, setRedirect]=useState(false);

    const parksRef = collection(db, 'interestForms');
   
    const writePersonalInfo=async(e)=>{
     
      e.preventDefault();
      const userRef=doc(db,"users",user.uid)
      await updateDoc(userRef,{
          parent_or_child: e.target.parent_or_child.value,
          contact_by:e.target.follow_up.value,
          job_zip:e.target.job_zip.value,
          social_1_pref:e.target.social_1_pref.value,
          social_1_handle:e.target.social_1_handle.value,
          social_2_pref:e.target.social_2_pref.value,
          social_2_handle:e.target.social_2_handle.value,
          other_info:e.target.other_info.value,
          job_pref_1:e.target.pref_1.value,
          job_pref_2:e.target.pref_2.value,
          job_pref_3:e.target.pref_3.value,
        
      }, {merge:true})
      console.log('succesfully added personal info')
     
    }
   
    const handleFirstLogin=async(user)=>{
      // if (user_info.uid){
      const userRef=doc(db,'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
       if (docSnap.data().user_logins<=1 || !docSnap.data().user_logins){
        console.log(docSnap.data().user_logins)
       console.log(false);
       setRedirect(true);
      }}};

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
          return;
        }
        setVerticalActive(value);
      };
      useEffect(()=>{
        // ReactGA.pageview(window.location.pathname)
        handleFirstLogin(user);
      },[])
      useEffect(()=>{
        window.dataLayer.push({
          event: 'pageview',
          page:{
            title:'userProfile'
          }
      })},[])
    
  return (
    <MDBContainer className='p-0 profile-container ' fluid>
        <MDBRow>
        <MDBCol size='3' className='sidenav-div'>
          <MDBTabs className='flex-column mt-5'>
            {redirect? 
            <>
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab' data-testid='settingsTab' onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
              <GearSix size={20} className='me-2'/>Personal Settings
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink data-testid='personalPrefTab' className='profile-tab mt-2' onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
              <User size={20} className='me-2'/>Job Preferences
              </MDBTabsLink>
            </MDBTabsItem>

            </>
            :
            <>
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab' data-testid='settingsTab' onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
              <GearSix size={20} className='me-2'/>Personal Settings
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink data-testid='personalPrefTab' className='profile-tab mt-2' onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
              <User size={20} className='me-2'/>Job Preferences
              </MDBTabsLink>
            </MDBTabsItem>
            </>}
            
         
            <MDBTabsItem>
              <MDBTabsLink className='profile-tab mt-2' data-testid='savedJobsTab' onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
              <Heart size={20} className='me-2'/>Saved Jobs
              </MDBTabsLink>
            </MDBTabsItem>

            <MDBTabsItem>
              <MDBTabsLink className='profile-tab mt-2' data-testid='submittedFormsTab' onClick={() => handleVerticalClick('tab4')} active={verticalActive === 'tab4'}>
              <ListChecks size={20} className='me-2'/>Submitted Interest Forms
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
          
        </MDBCol>
        <MDBCol size='9' className=''>
          <MDBTabsContent className='mt-5 '>
            {/* {redirect?
            <>
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab2'}>
            <h4 className='display-5 mb-5 ms-5'>Personal Settings</h4>
            <Settings setUser={setUser} createPopUp={createPopUp} signUserOut={signUserOut} user={user}/>
            </MDBTabsPane>
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab1'}>
                <h4 className='display-5 mb-5'>Personal Preferences</h4>
                <PersonalInfo user={user} writePersonalInfo={writePersonalInfo}/>
            </MDBTabsPane>
            </>
            :
            <> */}
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab1'}>
            <h4 className='display-5 mb-5 ms-5'>Personal Settings</h4>
            <Settings user={user}/>
            </MDBTabsPane>
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab2'}>
                <h4 className='display-5 mb-5'>Job Preferences</h4>
                <PersonalInfo user={user} writePersonalInfo={writePersonalInfo}/>
            </MDBTabsPane>
            {/* </>} */}
            
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab3'}>
            <h4 className='display-5 mb-5'>Saved Jobs</h4>
            <SavedJobs user={user}/>
            </MDBTabsPane>
            <MDBTabsPane className='ms-5' show={verticalActive === 'tab4'}>
            <h4 className='display-5 mb-5'>Submitted Interests</h4>
            <SubmittedInterests user={user}/>
            </MDBTabsPane>
          
            
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
