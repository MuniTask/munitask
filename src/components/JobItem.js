import React, { useState } from 'react'
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
import {MapPin, Heart} from "phosphor-react";
import logo from '../images/munitask-logo.png';

// const titleCase=(str)=> {
//   str = str.toLowerCase();
//   str = str.split(' ');
//   for (var i = 0; i < str.length; i++) {
//     str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
//   }
//   return str.join(' '); 
// }

export default function JobItem({job, myjobs}) {
 const [liked, setLiked]=useState(false)
 const handleLike = () => setLiked(true);
  const handleUnlike = () => setLiked(false);
  return (
    <>
    {/* <MDBContainer>
        <MDBRow> */}
        
        <MDBCol lg='6' xl='4' md='6' sm='10'>
            <Link className='job-card-link' job={job} to={`/${job.job_id}`} state={{job:job}}>
            <MDBCard shadow='0' border='' background='white' className='mb-3 d-flex flex-row job-card'>
                <div className='d-flex align-self-center'>
                {job.logo_url? <><MDBCardImage className='park-logo2'src={job.logo_url}/></>: <><MDBCardImage className='park-logo1 ' src={logo}/></>}
                </div>
                <MDBCardBody className='ps-2 job-card-body'>
                    <MDBCardText className='employer'>{job.municipality} Park District</MDBCardText>
                    <MDBCardTitle className='job-title'>{job.job_description}</MDBCardTitle>
                    
                    <MDBCardText className='job-description d-flex flex-row justify-content-between'> <MapPin size={20} />{job.zip_code}
                    {liked?<><Heart onClick={handleUnlike} weight='fill' size={28} className='ms-auto'/></>:<><Heart onClick={handleLike} size={28} className='ms-auto'/></>}
                    </MDBCardText>
                    
                </MDBCardBody>
            </MDBCard>
            </Link>
            </MDBCol>
            
        {/* </MDBRow>
    </MDBContainer> */}
    
      </>
  )
}
