import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import JobItem from '../components/JobItem';
import JobSearch from '../components/JobSearch';
import '../styles/styles.css';
import {db} from '../firebase';
import { getDatabase, ref, onValue, set} from "firebase/database";
import { MDBContainer, MDBRow, MDBInputGroup, MDBBtn, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBCol } from 'mdb-react-ui-kit';



   

export default function Home() {
  const  [jobs, setjobs]=useState(['Job1','job2','job3', 'job4',  'job5', 'job6','job7','job8','job9','Job1','job2','job3', 'job4',  'job5', 'job6','job7','job8','job9'])
  const  [myjobs, setmyjobs]=useState([])
  const [keyword, setKeyword]=useState('')
  const [location, setLocation]=useState('')
  const db = getDatabase();

  const parksRef = ref(db, 'parks');
  const getJobs=()=>{
    onValue(parksRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      let new_lst=[]
      for (let x of data){
       new_lst.push(x)
      }
      console.log(new_lst)
      setmyjobs(new_lst)
    });
  }
  const showJob=()=>{
    return(myjobs.map((job, i)=> <JobItem key={i} myjobs={myjobs} job={job}/>))
  }
  const search = (e) => {
    e.preventDefault();
    const keywords = e.target.keyword.value;
    const location=e.target.location.value;
    console.log(keywords, location)
    getJobs(keywords, location)
  };
 
  

  useEffect(()=>{
    getJobs();
   
  },[])

  return (
    <div className='page-container'>



      <div>
      <div className='container-fluid'>
        <form onSubmit={(e)=>search(e)}>
        <MDBInputGroup   className='w-50 mx-auto mt-5 mb-4 '>
        <input type="text" name='keyword' aria-label="First name" className="form-control" placeholder='Job title, company name, keywords'/>
        <input type="text" name='location' aria-label="Last name" className="form-control" placeholder='City, state or zip code'/>
        <MDBBtn outline type="submit">Search</MDBBtn>
        
        </MDBInputGroup>
        </form>
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
        <MDBContainer >
        <MDBRow > 
      {showJob()}
      </MDBRow> 
    </MDBContainer>
        
      </div>
    </div>
  )
}
