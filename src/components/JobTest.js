import React from 'react'
import {
    MDBContainer,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBRow
  } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function JobTest({jobs}) {

  return (
    <>
    <MDBContainer>
    
        {jobs.map((title)=>
   
            <Link to={`/${title}`}>
            <MDBCard shadow='0' border='' background='white' className='mb-3 '>
                <MDBCardHeader>Company</MDBCardHeader>
                <MDBCardBody className=''>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>Job Description</MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </Link>
    
            )}
  
    </MDBContainer>
    
      </>
  )
}
