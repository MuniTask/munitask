import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import JobItem from '../components/JobItem';
import '../styles/styles.css';
import {DotsThreeOutline, Sliders, SlidersHorizontal} from "phosphor-react";
import {db} from '../firebase';
import {Dropdown, Button, ButtonGroup} from "react-bootstrap";
import { collection, query, where, getDocs, limit, doc, getDoc} from "firebase/firestore";
import { MDBContainer, MDBRow, MDBInputGroup } from 'mdb-react-ui-kit';
import FilterModal from '../components/FilterModal';
import {Puff} from 'react-loader-spinner';
import Maps from '../components/Maps';
import golf from '../images/golf-cart.png';
import swimInstructor from '../images/swimmer.png';
import lifeguard from '../images/life-saver.png';
import poolMaint from '../images/swimming-pool.png';
import campCounselor from '../images/tent.png';
import parkMaint from '../images/under-maintenance.png';
   
export default function Home2({user, createPopUp}) {
  const  [myjobs, setmyjobs]=useState()
  const [constJobs, setConstJobs]=useState()
  const [keywords, setKeywords]=useState('')
  const [locations, setLocations]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [savedJobs, setSavedJobs]=useState([])

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);
  const handleFilter = (search) => {
    const keywordInput = document.getElementById('keyword_input');
    keywordInput.value = '';
    const locationInput = document.getElementById('location_input');
    locationInput.value = '';
    setKeywords(search);
    setLocations([]);
  }

  const jobsRef = collection(db, 'jobs');

  // const getJobs=async()=>{
  //   if (keywords==='' && locations ===''){
  //       const data = await getDocs(collection(db, 'jobs'));
  //       console.log(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
  //       setmyjobs(data.docs.map((doc)=>({...doc.data(), id:doc.id}))); }
  // }
  const getJobs=async()=>{
    console.log('GET JOBS FUNCTION')
    const data = await getDocs(collection(db, 'jobs'));
    const newJobsList=[];
    for (let doc of data.docs){
      const zip_code=await getZip(doc.data().municipality)
      const latitude=await getLat(doc.data().municipality)
      const longitude=await getLng(doc.data().municipality)
      const logo_url=await getLogo(doc.data().municipality)
      const skip=await getLng(doc.data().municipality).then( 
        newJobsList.push({...doc.data(), latitude: latitude, longitude:longitude, zip_code:zip_code, logo_url:logo_url})
      )
    };
    console.log(newJobsList)
    setmyjobs([...newJobsList])
    setConstJobs([...newJobsList])
};


const getZip=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst == null || data_lst.length==0){
    return 0
  }
  const mun_zip=data_lst[0].zip_code;
  return mun_zip;
};  

const getLogo=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst == null || data_lst.length==0){
    return 0
  }
  const mun_logo=data_lst[0].logo_url;
  return mun_logo;
};  

const getLng=async(mun)=>{
const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}));
if (data_lst == null || data_lst.length==0){
  return 0
}
const mun_lng=data_lst[0].longitude;
return mun_lng;
};
const getLat=async(mun)=>{
const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}));

if (data_lst == null || data_lst.length==0){
  return 0
}
const mun_lat=data_lst[0].latitude;
return mun_lat;
};

  const showJob=()=>{
    if (myjobs !==''){
        return(myjobs.map((job, i)=> <JobItem key={i} createPopUp={createPopUp} savedJobs={savedJobs} myjobs={myjobs} job={job} user={user}/>))
    } else{
        return(<><p>No jobs match this search</p></>)
    }
    
   
  }
  const search = async(e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    const location=e.target.location.value;
    const exact_location=await searchZip(location)
    const location_lst=[]
    for (let x of exact_location.features){
      location_lst.push(x)
    }
    console.log('location',location_lst)
    console.log('keyword',keyword)
    setKeywords(keyword);
    setLocations(location_lst);
    
  };
  const searchZip = async (city) => {
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    const data = await res.json();
    return data;
};

 
  const getSearchedJobs=async()=>{
    if (keywords === "" && !locations[0]){
      getJobs()
    }
    else if (keywords!=="" && !locations[0]){
      const newJobsList=[];
      const que=query(collection(db,'jobs'),where("title","==",keywords));
      const data = await getDocs(que);
      const new_lst=[];
        for (let doc of data.docs){
          const zip_code=await getZip(doc.data().municipality)
          const latitude=await getLat(doc.data().municipality)
          const longitude=await getLng(doc.data().municipality)
          const logo_url=await getLogo(doc.data().municipality)
          const skip=await getLng(doc.data().municipality).then( 
            newJobsList.push({...doc.data(), latitude: latitude, longitude:longitude, zip_code:zip_code, logo_url:logo_url})
          )
        };
        console.log('keyword only search',newJobsList)
        setmyjobs([...newJobsList])
    }
    else if (keywords==="" && locations !== []){
      const newJobsList=[];
      for (let x of constJobs){
        if (x.longitude >= locations[0].bbox[0] && x.longitude <= locations[0].bbox[2] && x.latitude >= locations[0].bbox[1] && x.latitude <= locations[0].bbox[3]){
          newJobsList.push(x)
          console.log(x)
          console.log(x.longitude, x.latitude)
        } else{ console.log('job not in range')}
      }
      console.log('location only search:',newJobsList)
      setmyjobs([...newJobsList])
    }
    else if (keywords!=="" && locations !== []){
      const newJobsList=[];
      const que=query(collection(db,'jobs'),where("title","==",keywords));
      const data = await getDocs(que);
      const new_lst=[];
        for (let doc of data.docs){
          const zip_code=await getZip(doc.data().municipality)
          const latitude=await getLat(doc.data().municipality)
          const longitude=await getLng(doc.data().municipality)
          const logo_url=await getLogo(doc.data().municipality)
          const skip=await getLng(doc.data().municipality).then( 
            newJobsList.push({...doc.data(), latitude: latitude, longitude:longitude, zip_code:zip_code, logo_url:logo_url})
          )
        } for (let x of newJobsList){
          if (x.longitude >= locations[0].bbox[0] && x.longitude <= locations[0].bbox[2] && x.latitude >= locations[0].bbox[1] && x.latitude <= locations[0].bbox[3]){
            new_lst.push(x)
            console.log(x)
            console.log(x.longitude, x.latitude)
          } else{ console.log('job not in range')}
        }
        console.log('keyword and location search:',new_lst)
        setmyjobs([...new_lst])
    }
   
  };

  const getSavedJobs=async()=>{
    const userRef=doc(db,"users",user.uid)
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setSavedJobs(docSnap.data().saved_jobs);
    } else {
      console.log("No saved jobs!");
    }
    
  }

  useEffect(() => {
    getSearchedJobs();
    
  }, [keywords, locations]);
  useEffect(()=>{
    
    getSavedJobs();

  },[])

  return (
    <div className='page-container'>

     
      <div >
      <div className='mt-4 d-flex flex-row justify-content-center search-container'>
      <div className='d-flex flex-column me-3'>
        <h5 onClick={()=>{handleFilter('')}} className='mx-auto d-flex justify-content-center align-items-center job-icon p-0 m-0' alt='...' style={{border:'4px solid gray',}}><DotsThreeOutline size={40} /></h5>
         <p className='job-icon-text text-center'>All</p>
         </div>
        <div className='d-flex flex-column me-3'>
        <img onClick={()=>handleFilter('golf ranger')} className='mx-auto job-icon' src={golf} alt='...' style={{border:'4px solid green',}}/>
        <p className='job-icon-text text-center'>Golf Ranger</p>
        </div>
        <div className='d-flex flex-column me-3'>
        <img onClick={()=>handleFilter('swim instructor')}className='mx-auto  job-icon' src={swimInstructor} alt='...' style={{border:'4px solid #745cac',}}/>
         <p className='job-icon-text text-center'>Swim Instructor</p>
         </div>
        <div className='d-flex flex-column me-3'>
        <img onClick={()=>handleFilter('lifeguard')}className='job-icon' src={lifeguard} alt='...' style={{border:'4px solid #DB2118',}}/>
         <p className='job-icon-text text-center'>Lifeguard</p>
         </div>
        <div className='d-flex flex-column me-3'>
        <img onClick={()=>handleFilter('pool maintenance')}className='mx-auto job-icon' src={poolMaint} alt='...' style={{border:'4px solid #33DDFF',}}/>
         <p className='job-icon-text text-center'>Pool Maintenance</p>
         </div>
        <div className='d-flex flex-column me-3'>
        <img onClick={()=>handleFilter('camp counselor')}className='mx-auto job-icon' src={campCounselor} alt='...' style={{border:'4px solid blue',}}/>
         <p className='job-icon-text text-center'>Golf Ranger</p>
         </div>
        <div className='d-flex flex-column'>
        <img onClick={()=>handleFilter('park maintenance')}className='mx-auto  job-icon' src={parkMaint} alt='...' style={{border:'4px solid #ee7600',}}/>
         <p className='job-icon-text text-center'>Park Maintenance</p>
         </div>
        
        </div>
      <div className='container-fluid'>
        <form onSubmit={(e)=>search(e)}>
        <MDBInputGroup   className='w-50 mx-auto mt-3 mb-4 '>
        <input type="text" id='keyword_input' name='keyword' aria-label="Job title" className="form-control" placeholder='Job title, municipality, or keywords'/>
        <input type="text" id='location_input' name='location' aria-label="Zip code" className="form-control" placeholder='City, state or zip code'/>
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
    {myjobs?<>
          {showMap?
          <>
            <MDBContainer >
              <Maps user={user} myjobs={myjobs} savedJobs={savedJobs} createPopUp={createPopUp}/>
            </MDBContainer>
          </>:<>
        
            {/* <MDBRow >  */}
            <div className='d-flex flex-row flex-wrap justify-content-center'>
            {myjobs? <>{showJob()}</>:<></>}
            </div>
            {/* </MDBRow> */}
         
          </>}
          </>

      :<>
      <div className='d-flex flex-column align-items-center mx-auto'>
      <Puff height="112" color="#c3db74" ariaLabel="puff-loading"  />
      </div>
      </>}
        
      </div>
     

    </div>
  )
}
