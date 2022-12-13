import React, { useState } from 'react';
import { collection, query, where } from 'firebase/firestore';
import {Modal,Form, Button, Col, Row} from 'react-bootstrap';
import {db} from '../firebase';
export default function FilterModal({handleClose, show}) {
  const [ value, setValue ] = useState(25);

  const [stats, setStats]=useState()
  const searchZip = async (city) => {
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    const data = await res.json();
    return data;
};
  const getFilters=async(e)=>{
    e.preventDefault();
    const jobsRef = collection(db, "jobs");
    const zip=await searchZip(e.target.zip.value);
    console.log(zip.features[0].bbox)
    const distance=e.target.distance_range.value;
    const pay1=e.target['10andup'].checked
    const pay2=e.target['15andup'].checked
    const pay3=e.target['20andup'].checked
    console.log(distance, pay1, pay2, pay3)
    // const q1 = query(jobsRef, where('wage',"<=","CA"), where("state", "<=", "IN"));
    setStats(distance)
  }


  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Your Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>{getFilters(e)}}>
          <label htmlFor='zip'>Zip code or city</label><br></br>
          <input type='text' name='zip'/><br></br>
          <Form.Label>Distance</Form.Label>
          <Row>
            <Col xs='10'>
              <Form.Range defaultValue={value} onChange={e => setValue(e.target.value)}/>
            </Col>
            <Col xs='2'>
              <Form.Control name='distance_range' defaultValue={value}/>
            </Col>
          </Row>
          <Form.Label>Compensation</Form.Label>
          <Form.Check name='10andup' type='radio' label='$10/hr & up'/>
          <Form.Check name='15andup' type='radio' label='$15/hr & up'/>
          <Form.Check name='20andup' type='radio' label='$20/hr & up'/>

          <Button variant="dark" type='submit'>
            Save Changes
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
  )
}
