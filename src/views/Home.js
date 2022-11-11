import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import JobItem from '../components/JobItem';
import '../styles/styles.css';
import {Sliders, SlidersHorizontal} from "phosphor-react";
import {db} from '../firebase';
import {Dropdown, Button, ButtonGroup} from "react-bootstrap";
import { getDatabase, ref, onValue, set, child, get, query, limitToFirst, limitToLast, orderByChild, startAt, startAfter, endAt
, endBefore, equalTo} from "firebase/database";
import { MDBContainer, MDBRow, MDBInputGroup, MDBBtn, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBCol } from 'mdb-react-ui-kit';
import FilterModal from '../components/FilterModal';
import Maps from '../components/Maps';



   
export default function Home() {
  const  [myjobs, setmyjobs]=useState([])
  const [keywords, setKeywords]=useState('')
  const [locations, setLocations]=useState('')
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);
  const db = getDatabase();

  const jobsRef = ref(db, 'jobs');

  const getJobs=()=>{
    if (keywords=='' && locations ==''){
      onValue(jobsRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        let new_lst=[]
        for (let x of data){
         new_lst.push(x)
        }
        console.log(new_lst)
        setmyjobs(new_lst)
    }); }
  }
  const showJob=()=>{
    return(myjobs.map((job, i)=> <JobItem key={i} myjobs={myjobs} job={job}/>))
  }
  const search = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    const location=e.target.location.value;
    console.log(keyword, location);
    setKeywords(keyword);
    setLocations(location);
    
  };
 
  const getTheseJobs=()=>{
    if (keywords!=''){
      const que=query(ref(db,'jobs'),orderByChild('job_description'),equalTo(keywords));
    get(que)
    .then((snapshot)=>{
      let mun_jobs=[];
      snapshot.forEach(childNsapshot=>{
        mun_jobs.push(childNsapshot.val());
      })
      console.log(mun_jobs, 'hi')
        setmyjobs(mun_jobs)
        console.log('yo')
    })
    }
    else{
      onValue(jobsRef, (snapshot) => {
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
    
  }
  useEffect(() => {
    getTheseJobs();
  }, [keywords]);
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
        <button className='btn btn-outline-dark' type="submit">Search</button>
        
        </MDBInputGroup>
        </form>
        <div  className='d-flex justify-content-end align-items-baseline mb-5 w-75'>
          <Dropdown>
              <Dropdown.Toggle variant='link' focusfirstitemonshow='false' className='sort-btn' id="dropdown-basic">
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu >
                <Dropdown.Item>Most Recent</Dropdown.Item>
                <Dropdown.Item>Relevance</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          <div>
          <Button className='filter-btn' variant='link' type="button" onClick={handleShowModal}>Filter<SlidersHorizontal size={32}/></Button>
          <FilterModal handleClose={handleCloseModal} show={showModal}/>
            {/* // <Button className='filter-btn' variant='link' type="button" >Filters <SlidersHorizontal size={32} /></Button> */}
            </div>
            <ButtonGroup >
                <Button variant='outline-dark' className='list-btn' onClick={handleCloseMap}>List</Button>
                <Button variant='outline-dark' className='map-btn' onClick={handleShowMap}>Map</Button>
            </ButtonGroup>
              
        </div>
       
    </div>
        <MDBContainer >
          {showMap?<>
          <Maps/>
          </>:<>
        <MDBRow > 
      {showJob()}
      </MDBRow> </>}
    </MDBContainer>
        
      </div>
    </div>
  )
}
