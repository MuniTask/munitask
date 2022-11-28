import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import JobItem from '../components/JobItem';
import '../styles/styles.css';
import {Sliders, SlidersHorizontal} from "phosphor-react";
import {db} from '../firebase';
import {Dropdown, Button, ButtonGroup} from "react-bootstrap";
import { collection, query, where, getDocs, limit} from "firebase/firestore";
import { MDBContainer, MDBRow, MDBInputGroup } from 'mdb-react-ui-kit';
import FilterModal from '../components/FilterModal';
import Maps from '../components/Maps';
import golf from '../images/golf-cart.png';
import swimInstructor from '../images/swimmer.png';
import lifeguard from '../images/life-saver.png';
import poolMaint from '../images/swimming-pool.png';
import campCounselor from '../images/tent.png';
import parkMaint from '../images/under-maintenance.png';



   
export default function Home2({user}) {
  const  [myjobs, setmyjobs]=useState([])
  const [keywords, setKeywords]=useState('')
  const [locations, setLocations]=useState('')
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);


  const jobsRef = collection(db, 'jobs');

  const getJobs=async()=>{
    if (keywords==='' && locations ===''){
        const data = await getDocs(collection(db, 'jobs'));
        console.log(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
        setmyjobs(data.docs.map((doc)=>({...doc.data(), id:doc.id}))); }
  }
  //   const getJobs=async()=>{
//     const data = await getDocs(collection(db, 'jobs'));
//     console.log(data)
//     console.log(data.docs.map((doc)=>({...doc.data(), id:doc.id, latitude:getLat(doc.data().municipality),longitude:getLng(doc.data().municipality),zip_code:getZip(doc.data().municipality)}))); 
//     setmyjobs(data.docs.map((doc)=>({...doc.data(), id:doc.id, latitude:getLat(doc.data().municipality),longitude:getLng(doc.data().municipality),zip_code:getZip(doc.data().municipality)}))); 
// }

const getZip=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}))
  const mun_zip=data_lst[0].zip_code
  return mun_zip
  };
  const getLng=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}))
  const mun_lng=data_lst[0].longitude
  return mun_lng
  };
  const getLat=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}))
  const mun_lat=data_lst[0].latitude
  return mun_lat
  };
  

  const showJob=()=>{
    if (myjobs !==''){
        return(myjobs.map((job, i)=> <JobItem key={i} myjobs={myjobs} job={job} user={user}/>))
    } else{
        return(<><p>NO jobs match this search</p></>)
    }
    
   
  }
  const search = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    const location=e.target.location.value;
    console.log(keyword, location);
    setKeywords(keyword);
    setLocations(location);
    
  };
 
  const getSearchedJobs=async()=>{
    if (keywords!==''){
      const que=query(collection(db,'jobs'),where("title","==",keywords));
      const data = await getDocs(que);
      const new_lst=[]
      console.log(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
        setmyjobs(data.docs.map((doc)=>({...doc.data(), id:doc.id}))); 
    }
  };



  useEffect(() => {
    getSearchedJobs();
    getLat('Alsip');
  }, [keywords]);
  useEffect(()=>{
    getJobs();

  },[])

  return (
    <div className='page-container'>



      <div>
      <div className='mt-4 d-flex flex-row justify-content-center'>
        <img className='me-5 job-icon' src={golf} alt='...' style={{border:'4px solid green',}}/>
        <img className='me-5 job-icon' src={swimInstructor} alt='...' style={{border:'4px solid purple',}}/>
        <img className='me-5 job-icon' src={lifeguard} alt='...' style={{border:'4px solid red',}}/>
        <img className='me-5 job-icon' src={poolMaint} alt='...' style={{border:'4px solid gold',}}/>
        <img className='me-5 job-icon' src={campCounselor} alt='...' style={{border:'4px solid blue',}}/>
        <img className='me-5 job-icon' src={parkMaint} alt='...' style={{border:'4px solid pink',}}/>
        </div>
      <div className='container-fluid'>
        <form onSubmit={(e)=>search(e)}>
        <MDBInputGroup   className='w-50 mx-auto mt-3 mb-4 '>
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
        
          {showMap?
          <>
            <MDBContainer >
              <Maps myjobs={myjobs}/>
            </MDBContainer>
          </>:<>
          <MDBContainer>
            {/* <MDBRow >  */}
            <div className='d-flex flex-row flex-wrap'>
            {myjobs? <>{showJob()}</>:<></>}
            </div>
            {/* </MDBRow> */}
          </MDBContainer>
          </>}
    
        
      </div>
    </div>
  )
}
