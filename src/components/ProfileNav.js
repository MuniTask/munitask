import { MDBAccordion, MDBAccordionItem, MDBBtn, MDBBtnGroup, MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'

export default function ProfileNav() {
  return (
    <MDBContainer fluid className='p-0'>
    <MDBBtnGroup vertical aria-label='Vertical button group'>
      <MDBBtn >Settings</MDBBtn>
      <MDBBtn>Saved Jobs</MDBBtn>
      <MDBBtn>Interest Form</MDBBtn>
      
    </MDBBtnGroup>
    </MDBContainer>
  )
}
