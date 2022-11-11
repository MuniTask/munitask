import React, { useState } from 'react'
import {Modal,Form, Button, Col, Row} from 'react-bootstrap';
export default function FilterModal({handleClose, show}) {
  const [ value, setValue ] = useState(25);
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Your Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Label>Distance</Form.Label>
          <Row>
            <Col xs='10'>
              <Form.Range value={value} onChange={e => setValue(e.target.value)}/>
            </Col>
            <Col xs='2'>
              <Form.Control value={value}/>
            </Col>
          </Row>
          <Form.Label>Compensation</Form.Label>
          <Form.Check type='radio' label='$10/hr & up'/>
          <Form.Check type='radio' label='$15/hr & up'/>
          <Form.Check type='radio' label='$20/hr & up'/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
