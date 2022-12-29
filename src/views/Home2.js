import React, { useEffect, useState } from 'react'
import JobItem from '../components/JobItem';
import '../styles/styles.css';
import {ArrowsClockwise, DotsThreeOutline, SlidersHorizontal} from "phosphor-react";
import {db} from '../firebase';
import {Dropdown, Button, ButtonGroup} from "react-bootstrap";
import { collection, query, where, getDocs, limit, doc, getDoc, updateDoc} from "firebase/firestore";
import { MDBContainer } from 'mdb-react-ui-kit';
import FilterModal from '../components/FilterModal';
import {Puff} from 'react-loader-spinner';
import Maps from '../components/Maps';
import golf from '../images/golf-cart.png';
import swimInstructor from '../images/swimmer.png';
import lifeguard from '../images/life-saver.png';
import poolMaint from '../images/swimming-pool.png';
import campCounselor from '../images/tent.png';
import parkMaint from '../images/under-maintenance.png';
import { geohashForLocation } from 'geofire-common';
import { titleCase } from '../FunctionStorage';

   
export default function Home2({user, createPopUp, redirect, setGlobalJobs, globalJobs}) {
  const  [myjobs, setmyjobs]=useState();
  const [constJobs, setConstJobs]=useState();
  const [filterOnly, setFilterOnly]=useState();
  const [keywords, setKeywords]=useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [savedJobs, setSavedJobs]=useState([]);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);

  const handleFilter = (search) => {
 
    setKeywords(search);
 
  }

  const jobsRef = collection(db, 'jobs');

const getJobs=async()=>{
  if (globalJobs){
    setmyjobs([...globalJobs]);
    setConstJobs([...globalJobs]);
    setFilterOnly([...globalJobs]);
  } else if (!globalJobs){
    const data = await getDocs(collection(db, 'jobs'));
    const newJobsList=[];
    const setList=[];
    for (let document of data.docs){
      try{
        const zip_code=await getZip(document.data().municipality)
        const latitude=await getLat(document.data().municipality)
        const longitude=await getLng(document.data().municipality)
        const logo_url=await getLogo(document.data().municipality)
        const hash=geohashForLocation([latitude, longitude])
        const skip=await getLng(document.data().municipality).then( 
          await updateDoc(doc(db,'jobs',document.data()._id),{geohash:hash, latitude:latitude, longitude:longitude,logo_url:logo_url, zip_code:zip_code}).then(()=>{
           console.log('docs updated')
          })
         
        )
    }catch(error){
      console.log(error)
    }};
    const data2 = await getDocs(collection(db, 'jobs'));
    data2.forEach((doc) => {
      
      setList.push(doc.data())
    });
    setmyjobs([...setList]);
    setConstJobs([...setList]);
    setGlobalJobs([...setList]);
    setFilterOnly([...setList]);
    console.log(setList)
  }
};


const getZip=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst === null || data_lst.length===0){
    return 0
  }
  const mun_zip=data_lst[0].zip_code;
  return mun_zip;
};  

const getLogo=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst === null || data_lst.length===0){
    return 0
  }
  const mun_logo=data_lst[0].logo_url;
  return mun_logo;
};  

const getLng=async(mun)=>{
const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}));
if (data_lst === null || data_lst.length===0){
  return 0
}
const mun_lng=data_lst[0].longitude;
return mun_lng;
};
const getLat=async(mun)=>{
const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}));

if (data_lst === null || data_lst.length===0){
  return 0
}
const mun_lat=data_lst[0].latitude;
return mun_lat;
};

  const showJob=()=>{
    if (myjobs !=='' && myjobs !==[]){
        return(myjobs.map((job, i)=> <JobItem key={i} createPopUp={createPopUp} savedJobs={savedJobs} myjobs={myjobs} job={job} user={user}/>))
    } else{
        return(<><h5>No jobs match this search</h5></>)
    }
    
   
  }
 
  const getSearchedJobs=async()=>{
    if (keywords === "" ){
      if (constJobs !== undefined){
        setmyjobs([...constJobs])
      } else {
        getJobs();
      }
    }
    else if (keywords!=="" ){
      const newJobsList=[];
      for (let x of filterOnly){
          if (x.title === keywords){
            newJobsList.push(x)
          }
          if (x.municipality===keywords){
            newJobsList.push(x)
          }
      }
        console.log('keyword only search',newJobsList)
        setmyjobs([...newJobsList])

    }
   
  };
  const sortByRecent =()=>{
    const new_list=[...myjobs]
    new_list.sort((a,b)=>b.date_added - a.date_added)
    setmyjobs(new_list)
  }

  const getSavedJobs=async()=>{
    if (user.uid){
      const userRef=doc(db,"users",user.uid)
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setSavedJobs(docSnap.data().saved_jobs);
      } else {
        console.log("No saved jobs!");
      }
    }
  };
 
  useEffect(() => {
    getSearchedJobs();
    
  }, [keywords]);
  useEffect(()=>{
    window.dataLayer.push({
      event: 'pageview',
      page:{
        title:'home'
      }
    })
  
    getSavedJobs();
  },[])

  return (
    
    <div className='page-container'>
      <p>{redirect}</p>
     
      <div >
      <div className='py-4 d-flex flex-row justify-content-center search-container'>
      <div className='job-icon-div d-flex flex-column '>
        <h5 onClick={()=>{handleFilter('')}} data-testid='allFilterBtn'  className='mx-auto d-flex justify-content-center align-items-center job-icon p-0 m-0' alt='...' style={{border:'4px solid gray',}}><DotsThreeOutline size={40} /></h5>
         <p className='job-icon-text text-center'>All</p>
         </div>
        <div className='job-icon-div d-flex flex-column '>
        <img onClick={()=>handleFilter('golf ranger')} data-testid='golfRangerFilterBtn' className='mx-auto job-icon' src={golf} alt='...' style={{border:'4px solid green',}}/>
        <p className='job-icon-text text-center'>Golf Ranger</p>
        </div>
        <div className='job-icon-div d-flex flex-column '>
        <img onClick={()=>handleFilter('swim instructor')} data-testid='swimInstructorFilterBtn' className='mx-auto  job-icon' src={swimInstructor} alt='...' style={{border:'4px solid #745cac',}}/>
         <p className='job-icon-text text-center'>Swim Instructor</p>
         </div>
        <div className='job-icon-div d-flex flex-column '>
        <img onClick={()=>handleFilter('lifeguard')} data-testid='lifeguardFilterBtn' className='mx-auto job-icon' src={lifeguard} alt='...' style={{border:'4px solid #DB2118',}}/>
         <p className='job-icon-text text-center'>Lifeguard</p>
         </div>
        <div className='job-icon-div d-flex flex-column '>
        <img onClick={()=>handleFilter('pool maintenance')} data-testid='poolMaintenanceFilterBtn' className='mx-auto job-icon' src={poolMaint} alt='...' style={{border:'4px solid #33DDFF',}}/>
         <p className='job-icon-text text-center'>Pool Maintenance</p>
         </div>
        <div className='job-icon-div d-flex flex-column '>
        <img onClick={()=>handleFilter('camp counselor')} data-testid='golfRangerFilterBtn' className='mx-auto job-icon' src={campCounselor} alt='...' style={{border:'4px solid blue',}}/>
         <p className='job-icon-text text-center'>Camp Counselor</p>
         </div>
        <div className='job-icon-div d-flex flex-column'>
        <img onClick={()=>handleFilter('park maintenance')} data-testid='parkMaintenanceFilterBtn' className='mx-auto  job-icon' src={parkMaint} alt='...' style={{border:'4px solid #ee7600',}}/>
         <p className='job-icon-text text-center'>Park Maintenance</p>
         </div>
        
        </div>
      <div className='container-fluid'>

    

        <div  className='d-flex justify-content-end align-items-baseline mb-5 w-75'>
          <div className='d-flex justify-content-end me-2 refresh-jobs-btn' data-testid='refreshJobsBtn'onClick={()=>{handleFilter('')}}>
            <p className='me-2' >Refresh</p>
            <ArrowsClockwise size={24} />
          </div>
          <Dropdown>
              <Dropdown.Toggle variant='link' data-testid='sortByDropdown' focusfirstitemonshow='false' className='sort-btn' id="dropdown-basic">
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu >
                <Dropdown.Item data-testid='sortByRecentBtn' onClick={sortByRecent}>Most Recent</Dropdown.Item>
                <Dropdown.Item data-testid='sortByRelevantBtn' onClick={()=>{handleFilter('')}}>Relevance</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          <div>
          <Button className='filter-btn' variant='link' type="button" onClick={handleShowModal} data-testid='showFilterModalBtn'>Filter<SlidersHorizontal size={32}/></Button>
          <FilterModal setFilterOnly={setFilterOnly} handleClose={handleCloseModal} myjobs={myjobs}  setmyjobs={setmyjobs} show={showModal}/>
           
            </div>
            <ButtonGroup >
                <Button variant='outline-dark' className='list-btn' data-testid='listViewBtn' onClick={handleCloseMap}>List</Button>
                <Button variant='outline-dark' className='map-btn' data-testid='mapViewBtn' onClick={handleShowMap}>Map</Button>
            </ButtonGroup>
              
        </div>
       
    </div>
    {myjobs?<>
          {showMap?
          <>
         
              
              <Maps user={user} myjobs={myjobs} savedJobs={savedJobs} createPopUp={createPopUp}/>
            
          </>:<>
        
         
            <div className='d-flex flex-row flex-wrap justify-content-center'>
            {myjobs? <>{showJob()}</>:<>
            <h5>No jobs match this search</h5></>}
            </div>
          
         
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
