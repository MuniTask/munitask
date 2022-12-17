import React, { useEffect, useState } from 'react';
import { collection, endAt, getDocs, orderBy, query, startAt } from 'firebase/firestore';
import {Modal,Form, Button, Col, Row} from 'react-bootstrap';
import {db} from '../firebase';
import { distanceBetween, geohashQueryBounds } from 'geofire-common';
export default function FilterModal({handleClose, show, constJobs, setmyjobs}) {
  const [ value, setValue ] = useState(10);
  const [ pay, setPay ] = useState(0);
 

  
  const searchZip = async (city) => {
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    const data = await res.json();
    return data;
};

  const getFilters=async(e)=>{
    e.preventDefault();
    if (e.target.zip.value !=='' ){
      const zip=await searchZip(e.target.zip.value);
      console.log('searchZip center lat/lng',zip.features[0].center)
      const radiusInM=e.target.distance_range.value *1609.34;
       await getBounds(zip.features[0].center[1],zip.features[0].center[0],radiusInM, e.target['payFilter'].value)
      //  if (e.target['payFilter'].value !== 'all'){
      //   const payFilter=e.target['payFilter'].value
      //   setPay(payFilter)
      //   console.log('radius in meters and pay checkboxes',radiusInM, payFilter)
      //   }
      //  else{
      //   console.log('radius in meters and pay checkboxes',radiusInM)
      //   }
    }
    else if(e.target.zip.value === '' && e.target['payFilter'].value !== 'all'){
      const payFilter=e.target['payFilter'].value
      const matchingJobs=[]
      for (let x of constJobs){
        if (parseFloat(x.wage) >= parseFloat(payFilter)){
          matchingJobs.push(x)
        }
        else if (payFilter === 'all'){
          matchingJobs.push(...constJobs)
        }
      }
      setmyjobs([...matchingJobs])
      setPay(payFilter)
      console.log(payFilter)
       }
  };

  const getBounds=async(lat,lng,radiusInM, wage)=>{
    console.log(lat, lng, radiusInM)
    const bounds= geohashQueryBounds([lat,lng],radiusInM);
    const promises=[]
    const jobsRef=collection(db,'jobs')
    for (const b of bounds){
      console.log(b)
      const q = query(jobsRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      promises.push(doc.data())
});
    }
    console.log('promises',promises)
    const matchingDocs=[];
    for (const snap of promises){
      const snapLat = snap.latitude
      const snapLng = snap.longitude
      const distanceInKm = distanceBetween([snapLat, snapLng], [lat,lng]);
      const distanceInM = distanceInKm * 1000;
      if (wage !=='all'){
        console.log('typeof pay',typeof wage)
        if (distanceInM <= radiusInM && parseFloat(snap.wage) >= parseFloat(wage)) {
          matchingDocs.push(snap);
          }
        }
      else{
        if (distanceInM <= radiusInM) {
          matchingDocs.push(snap);
            }
          }
    }
    console.log('matching docs',matchingDocs)
    setmyjobs([...matchingDocs])
}

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Your Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>{getFilters(e)}}>
          <label  className='mb-1' htmlFor='zip'>Location</label><br></br>
          <input data-testid='filter-location-btn' className='location-input mb-3' type='text' name='zip'/><br></br>
          <Form.Label>Distance</Form.Label>
          <Row>
            <Col xs='9'>
              <Form.Range data-testid='filter-location-range-slider' defaultValue={value} onChange={e => setValue(e.target.value)}/>
            </Col>
            <Col xs='3' className='d-flex flex-row align-items-baseline'>
              <Form.Control className='me-2' name='distance_range' readOnly value={value}/>
              <p>miles</p>
            </Col>
          </Row>
          <Form.Label>Compensation</Form.Label>
          <Form.Check name='payFilter' data-testid='filter-wage-all-radio' type='radio' defaultChecked value='all' label='all'/>
          <Form.Check name='payFilter' data-testid='filter-wage-10up-radio' type='radio' value='10' label='$10/hr & up'/>
          <Form.Check name='payFilter' data-testid='filter-wage-15up-radio' type='radio' value='15' label='$15/hr & up'/>
          <Form.Check name='payFilter' data-testid='filter-wage-20up-radio' type='radio' value='20' label='$20/hr & up'/>

          <Button className='mt-2' data-testid='save-filter-options-btn' variant="dark" type='submit'>
            Save Changes
          </Button>
          </Form>
        </Modal.Body>
     
      </Modal>
  )
}
