import React, { useState, useEffect} from 'react'
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
  import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {MapPin, Heart} from "phosphor-react";
import logo from '../images/munitask-logo.png';


export default function JobItem({job, myjobs}) {
  const [currentJob, setCurrentJob]=useState([]);
 const [liked, setLiked]=useState(false)
 const handleLike = () => setLiked(true);
  const handleUnlike = () => setLiked(false);
  useEffect (()=>{
    setCurrentJob(job);
  },[])
  return (
    <>
    {/* <MDBContainer>
        <MDBRow> */}
        
        
            {/* <Link className='job-card-link'  to={`/${job.id}`} state={{job:currentJob}}>
            <MDBCard shadow='0' border=''  className='mb-3 d-flex flex-row job-card'>
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
            </Link> */}
            
            
        {/* </MDBRow>
    </MDBContainer> */}
    <div className='m-3'>
    
    <Card style={{ width: '22rem' }} className='d-flex flex-row align-items-center'>
    <Link className='job-card-link '  to={`/${job.id}`} state={{job:currentJob}}>
      {job.logo_url?<>
      <div className=''>
      <img src={job.logo_url} width={'150rem'}/>
      </div></>:<>
      <div>
      <img variant="top" width={'150rem'} src={logo} />
      </div></>}
      </Link>
      <Card.Body className='job-card-body'>
    <Link className='job-card-link '  to={`/${job.id}`} state={{job:currentJob}}>
        <Card.Text>
        {job.municipality}
        </Card.Text>
        <Card.Title>{job.title}</Card.Title>
      </Link>
        <Card.Text className='d-flex flex-row justify-content-between job-description'>
        <MapPin size={20} />{job.zip_code}
        {liked?<><Heart onClick={handleUnlike} weight='fill' size={28} className='ms-auto like'/></>:<><Heart onClick={handleLike} size={28} className='ms-auto'/></>}
        </Card.Text>
      </Card.Body>
    </Card>
    
    </div>
      </>
  )
}
