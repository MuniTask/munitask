import { MDBCol, MDBTabs, MDBTabsLink, MDBTabsItem, MDBRow, MDBContainer, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react';
import {db} from '../firebase';
import { getDatabase, ref, onValue, set} from "firebase/database";
import InterestForm from '../components/InterestForm';
import ProfileNav from '../components/ProfileNav'

export default function UserProfile({user}) {
    const [verticalActive, setVerticalActive] = useState('tab1');
    const [forms, setForms]=useState([])
    const db = getDatabase();
    const parksRef = ref(db, 'interestForms');
   
    
    const getInterestForms=()=>{
      onValue(parksRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        let new_lst=[]
        for (let x of data){
         new_lst.push(x)
        }
        console.log(new_lst)
        setForms(new_lst)
      });
    }
    const writeInterestForm = (e)=> {
        e.preventDefault()
        const db = getDatabase();
        set(ref(db, 'interestForms/' + user.uid), {
          user_uid:user.uid,
          first_name:e.target.first_name.value,
          last_name:e.target.last_name.value,
          birthday:e.target.birthday.value,
          email:e.target.email.value,
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
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Settings
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                Saved Jobs
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
                Interests
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent className='mt-5'>
            <MDBTabsPane show={verticalActive === 'tab1'}>
            <h4 className='display-5'>Settings</h4>
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}>
            <h4 className='display-5'>Saved Jobs</h4>
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab3'}>
                <h4 className='display-5'>Interests and Personal Information</h4>
                <InterestForm writeInterestForm={writeInterestForm}/>
                </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
