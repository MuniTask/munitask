import React from 'react'
import { MDBInputGroup,
    MDBBtn, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBRow, MDBCol } from 'mdb-react-ui-kit';
export default function JobSearch() {
    
  return (
    <div className='container-fluid'>
        
        <MDBInputGroup className='w-50 mx-auto mt-5 mb-4 '>
        <input type="text" aria-label="First name" className="form-control" placeholder='Job title, company name, keywords'/>
        <input type="text" aria-label="Last name" className="form-control" placeholder='City, state or zip code'/>
        <MDBBtn outline type="submit">Search</MDBBtn>
        
        </MDBInputGroup>
    
        <div  className='d-flex justify-content-end mb-5 w-75'>
        <MDBDropdown>
            <MDBDropdownToggle size='xs' color='tertiary'>Sort By</MDBDropdownToggle>
            <MDBDropdownMenu>
            <MDBDropdownItem link>Most Recent</MDBDropdownItem>
            <MDBDropdownItem link>Relevance</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
            <div>
            <MDBBtn type="button" color='tertiary'>Filters</MDBBtn>
            </div>
            <MDBBtnGroup >
                <MDBBtn color='secondary' active>List</MDBBtn>
                <MDBBtn color='secondary' >Map</MDBBtn>
            </MDBBtnGroup>
        </div>
       
    </div>
  )
}
