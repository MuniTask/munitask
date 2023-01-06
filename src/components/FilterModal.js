import React, { useEffect, useState } from 'react';
import { collection, endAt, getDocs, orderBy, query, startAt } from 'firebase/firestore';
import {Modal,Form, Button, Col, Row} from 'react-bootstrap';
import {db} from '../firebase';
import { distanceBetween, geohashQueryBounds } from 'geofire-common';
export default function FilterModal({handleClose, show, myjobs, setmyjobs, setFilterOnly, location, setLocation, distance, setDistance}) {
  const [ value, setValue ] = useState(10);
  // const [ pay, setPay ] = useState(0);

  // const [compensation, setCompensation]=useState();
 

  
  const searchZip = async (city) => {
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    const data = await res.json();
    return data;
};

  const getFilters=async(e)=>{
    e.preventDefault();
    if (e.target.zip.value !=='' ){
      setLocation(e.target.zip.value);
      const zip=await searchZip(e.target.zip.value);
      let feature_index=0
      if (zip.features[0].place_name.includes('Illinois')){
        feature_index=0
      }
      else if (zip.features[1].place_name.includes('Illinois')){
        feature_index=1
      } else if (!zip.features[2].place_name.includes('Illinois')){
        feature_index=2
      }else{
        feature_index=3
      }
      const center=zip.features[feature_index].center
      const radiusInM=e.target.distance_range.value *1609.34;
       await getBounds(center[1],center[0],radiusInM, e.target['payFilter'].value)
      //  if (e.target['payFilter'].value !== 'all'){
      //   const payFilter=e.target['payFilter'].value
      //   setPay(payFilter)
      //   console.log('radius in meters and pay checkboxes',radiusInM, payFilter)
      //   }
      //  else{
      //   console.log('radius in meters and pay checkboxes',radiusInM)
      //   }
    }
    // else if(e.target.zip.value === '' && e.target['payFilter'].value !== 'all'){
    //   setCompensation(e.target['payFilter'].value);
    //   const payFilter=e.target['payFilter'].value
    //   const matchingJobs=[]
    //   for (let x of myjobs){
    //     if (parseFloat(x.wage) >= parseFloat(payFilter)){
    //       matchingJobs.push(x)
    //     }
    //     else if (payFilter === 'all'){
    //       matchingJobs.push(...myjobs)
    //     }
    //   }
    //   setmyjobs([...matchingJobs]);
    //   setFilterOnly([...matchingJobs]);
    //   setPay(payFilter)
    //   console.log(payFilter)
    //    }
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
      // if (wage !=='all'){
      //   setCompensation(wage)
      //   if (distanceInM <= radiusInM && parseFloat(snap.wage) >= parseFloat(wage)) {
      //     matchingDocs.push(snap);
      //     }
      //   }
      // else{
        if (distanceInM <= radiusInM) {
          matchingDocs.push(snap);
            }
          // }
    }
    console.log('matching docs',matchingDocs)
    setmyjobs([...matchingDocs]);
    setFilterOnly([...matchingDocs]);
}

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Your Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>{getFilters(e); handleClose()}}>
          <label  className='mb-1' htmlFor='zip'>Location</label><br></br>
          <input data-testid='filterLocationBtn' className='location-input mb-3' defaultValue={location} placeholder='City, state, or zip' type='text' name='zip'/><br></br>
          <Form.Label>Distance</Form.Label>
          <Row>
            <Col xs='9'>
              <Form.Range data-testid='filterLocationRangeSlider' defaultValue={distance} onChange={e => setDistance(e.target.value)}/>
            </Col>
            <Col xs='3' className='d-flex flex-row align-items-baseline'>
              <Form.Control className='me-2' name='distance_range' readOnly value={distance}/>
              <p>miles</p>
            </Col>
          </Row>
          {/* <Form.Label>Compensation</Form.Label>
          <Form.Check name='payFilter' data-testid='filterWageAllRadio' type='radio' defaultChecked value='all' label='all'/>
          <Form.Check name='payFilter' data-testid='filterWage10upRadio' type='radio' value='10' label='$10/hr & up'/>
          <Form.Check name='payFilter' data-testid='filterWage15upRadio' type='radio' value='15' label='$15/hr & up'/>
          <Form.Check name='payFilter' data-testid='filterWage20upRadio' type='radio' value='20' label='$20/hr & up'/> */}

          <Button className='mt-2' data-testid='saveFilterOptionsBtn' variant="dark" type='submit'>
            Save Changes
          </Button>
          </Form>
        </Modal.Body>
     
      </Modal>
  )
}
