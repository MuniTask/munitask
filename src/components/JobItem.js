import React from 'react'
import {
    MDBContainer,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBRow,
    MDBCardImage
  } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import logo from '../images/munitask-logo.png';

const titleCase=(str)=> {
  str = str.toLowerCase();
  str = str.split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' '); 
}

export default function JobItem({job, myjobs}) {
 
  return (
    <>
    {/* <MDBContainer>
        <MDBRow> */}
        
        <MDBCol lg='6' xl='4' md='6' sm='10'>
            <Link className='job-card-link' job={job} to={`/${job.job_id}`}>
            <MDBCard shadow='0' border='' background='white' className='mb-3 d-flex flex-row'>
                <div className='d-flex align-self-center'>
                {job.logo_url===""? <><MDBCardImage className='park-logo1 ' src={logo}/></>: <><MDBCardImage className='park-logo2'src={job.logo_url}/></>}
                </div>
                <MDBCardBody className='ms-2'>
                    <MDBCardText className='employer'>{job.municipality}</MDBCardText>
                    <MDBCardTitle className='job-title'>{titleCase(job.job_description)}</MDBCardTitle>
                    <MDBCardText className='job-description'> {job.zip_code}</MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </Link>
            </MDBCol>
            
        {/* </MDBRow>
    </MDBContainer> */}
    
      </>
  )
}
