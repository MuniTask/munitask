import React, { useEffect, useState } from 'react'
import JobItem from '../components/JobItem';
import '../styles/styles.css';
import {ArrowsClockwise, DotsThreeOutline, SlidersHorizontal} from "phosphor-react";
import {db} from '../firebase';
import { Button, ButtonGroup} from "react-bootstrap";
import { collection, query, where, getDocs, limit, doc, getDoc, updateDoc, startAt, endAt, startAfter, orderBy} from "firebase/firestore";
import FilterModal from '../components/FilterModal';
import {Puff} from 'react-loader-spinner';
import Maps from '../components/Maps';
import golf from '../images/golf-cart.png';
import swimInstructor from '../images/swimmer.png';
import lifeguard from '../images/life-saver.png';
import poolMaint from '../images/swimming-pool.png';
import campCounselor from '../images/tent.png';
import parkMaint from '../images/under-maintenance.png';
import { titleCase } from '../FunctionStorage';
import ReactPaginate from 'react-paginate';
import { distanceBetween, geohashQueryBounds } from 'geofire-common';


   
export default function Home2({user, createPopUp, redirect, setGlobalJobs, globalJobs}) {
  const  [myjobs, setmyjobs]=useState();
  const  [noMatches, setNoMatches]=useState(false);
  const [constJobs, setConstJobs]=useState();
  const [filterOnly, setFilterOnly]=useState();
  const [keywords, setKeywords]=useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [filterParams, setFilterParams]=useState();
  // const [savedJobs, setSavedJobs]=useState([]);
  const [location, setLocation]=useState();
  const [distance, setDistance]=useState(10);
  // paginate
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(15);
  const [pageCount, setPageCount] = useState(0);
  const [slice, setSlice]=useState()
  // end paginate

  const jobsRef = collection(db, 'jobs');

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);

  const handleFilter = (search) => {
    setKeywords(search);
  };

 const handleNoMatches=()=>{
  if (myjobs===[]){
    setNoMatches(true)
  }else{
    setNoMatches(false)
  }
 };

const handlePageClick = (e) => {
  const selectedPage = e.selected;
  setOffset(selectedPage + 1)
};
const clearFilters=()=>{
  setFilterParams();

}
const getJobs=async()=>{
  // global jobs is state in App.js - we use globalJobs instead of making a new firebase call
  if (globalJobs){
      if (filterParams){
       
          getBounds(filterParams.lat, filterParams.lng,filterParams.radiusInM)
        
      } else{
      // set paginate
      const slice_lst =globalJobs.slice(offset, offset+perPage)
      setSlice([...slice_lst]);
      setPageCount(Math.ceil(globalJobs.length/perPage))
      // end paginate
      setmyjobs([...globalJobs]);
      setConstJobs([...globalJobs]);
      setFilterOnly([...globalJobs]);
      setKeywords('')
      setLocation();
      setDistance(10);
      }
    
  } else if (!globalJobs){
    // this happens on first page load - make firebase call 
     setLocation();
    setDistance(10);
    setKeywords('');
    const setList=[];
    const data2 = await getDocs(collection(db, 'jobs'));
    data2.forEach((doc) => {
      setList.push(doc.data())
    });
      // set paginate
      const slice_lst =setList.slice(offset, offset+perPage)
      setSlice([...slice_lst]);
      setPageCount(Math.ceil(setList.length/perPage))
      // end paginate
    setmyjobs([...setList]);
    setConstJobs([...setList]);
    setGlobalJobs([...setList]);
    setFilterOnly([...setList]);
    console.log(setList)
  }
};


  const showJob=()=>{
    if (myjobs !=='' && myjobs !==[]){
        // set paginate
        return(slice.map((job, i)=> <JobItem key={i} job={job} />))
        // end paginate
        // return(myjobs.map((job, i)=> <JobItem key={i} job={job} />))
    } else{
        return(<><h5>No jobs match this search</h5></>)
    }
    
   
  }
 
  // this is the main function that displays jobs on home page
  const getSearchedJobs=async()=>{
    if (keywords === "" ){
      // if const jobs exists, then we use const jobs to set myjobs so we don't have to make a call to firebase
      if (constJobs !== undefined){
        if (filterParams){
          getJobs()
        }
        // set paginate
        const slice_lst =constJobs.slice(offset, offset+perPage)
        setSlice([...slice_lst]);
        setPageCount(Math.ceil(constJobs.length/perPage))
        // end paginate
        setmyjobs([...constJobs])
      } else {
        // this is what happens on the first page load
        getJobs();
      }
    }
    else if (keywords!=="" ){
      const newJobsList=[];
      // Using filterOnly here in case user uses a keyword and a filter simultaneusly - if not using a filter, the filetOnly list will remain the same as global Jobs(see getJobs())
      for (let x of filterOnly){
          if (x.title === keywords){
            newJobsList.push(x)
          }
          if (x.municipality===keywords){
            newJobsList.push(x)
          }
      }
        console.log('keyword only search',newJobsList)
        // set paginate
        const slice_lst =newJobsList.slice(offset, offset+perPage)
        setSlice([...slice_lst]);
        setPageCount(Math.ceil(newJobsList.length/perPage))
        // end paginate
        setmyjobs([...newJobsList])
    }
  };
  
      const getBounds=async(lat,lng,radiusInM)=>{
        console.log(lat, lng, radiusInM)
        const bounds= geohashQueryBounds([lat,lng],radiusInM);
        const promises=[]
        const jobsRef=collection(db,'jobs')
        for (const b of bounds){
          console.log('bounds',b)
          const q = query(jobsRef, orderBy('geohash'), startAfter(b[0]), endAt(b[1]));
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
            if (distanceInM <= radiusInM) {
              matchingDocs.push(snap);
                }
        }
        console.log('matching docs',matchingDocs)
        // start paginate
          const slice_lst =matchingDocs.slice(offset, offset+perPage)
          setSlice([...slice_lst]);
          setPageCount(Math.ceil(matchingDocs.length/perPage))
          // end paginate
       
        setFilterOnly([...matchingDocs]);
       
    }
    
  // const sortByRecent =()=>{
  //   const new_list=[...myjobs]
  //   new_list.sort((a,b)=>b.date_added - a.date_added)
  //   setmyjobs(new_list)
  // }

  useEffect(() => {
    getSearchedJobs();
  }, [keywords, offset]);
  
  useEffect(() => {
    getJobs()
  }, [filterParams]);
  

  useEffect(()=>{
    window.dataLayer.push({
      event: 'pageview',
      page:{
        title:'home'
      }
    })
  },[])


  return (
    
    <div className='page-container'>
      <p>{redirect}</p>
     
      <div >
      <div className='py-4  search-container'>
      <div className='job-icon-div icon-div1 d-flex flex-column '>
        <h5 onClick={()=>{handleFilter('')}} data-testid='allFilterBtn'  className='mx-auto d-flex justify-content-center align-items-center job-icon p-0 m-0' alt='...' style={{border:'4px solid gray',}}><DotsThreeOutline size={40} /></h5>
         <p className='job-icon-text text-center'>All</p>
         </div>
        <div className='job-icon-div icon-div2 d-flex flex-column '>
        <img onClick={()=>handleFilter('golf ranger')} data-testid='golfRangerFilterBtn' className='mx-auto job-icon' src={golf} alt='...' style={{border:'4px solid #E2EA8B',}}/>
        <p className='job-icon-text text-center'>Golf Ranger</p>
        </div>
        <div className='job-icon-div icon-div3 d-flex flex-column '>
        <img onClick={()=>handleFilter('swim instructor')} data-testid='swimInstructorFilterBtn' className='mx-auto  job-icon' src={swimInstructor} alt='...' style={{border:'4px solid #0D3869',}}/>
         <p className='job-icon-text text-center'>Swim Instructor</p>
         </div>
        <div className='job-icon-div icon-div4 d-flex flex-column '>
        <img onClick={()=>handleFilter('lifeguard')} data-testid='lifeguardFilterBtn' className='mx-auto job-icon' src={lifeguard} alt='...' style={{border:'4px solid #009CFA',}}/>
         <p className='job-icon-text text-center'>Lifeguard</p>
         </div>
        <div className='job-icon-div icon-div5  d-flex flex-column '>
        <img onClick={()=>handleFilter('pool maintenance')} data-testid='poolMaintenanceFilterBtn' className='mx-auto job-icon' src={poolMaint} alt='...' style={{border:'4px solid #005989',}}/>
         <p className='job-icon-text text-center'>Pool Maintenance</p>
         </div>
        <div className='job-icon-div icon-div6 d-flex flex-column '>
        <img onClick={()=>handleFilter('camp counselor')} data-testid='golfRangerFilterBtn' className='mx-auto job-icon' src={campCounselor} alt='...' style={{border:'4px solid #5A9053',}}/>
         <p className='job-icon-text text-center'>Camp Counselor</p>
         </div>
        <div className='job-icon-div icon-div7 d-flex flex-column'>
        <img onClick={()=>handleFilter('park maintenance')} data-testid='parkMaintenanceFilterBtn' className='mx-auto  job-icon' src={parkMaint} alt='...' style={{border:'4px solid #746E6E',}}/>
         <p className='job-icon-text text-center'>Park Maintenance</p>
         </div>
        
        </div>
      <div className='container-fluid'>

    

        <div  className='job-filter-bar'>
          <div className='d-flex justify-content-end me-2 refresh-jobs-btn' data-testid='refreshJobsBtn' onClick={()=>{clearFilters()}}>
            <p className='me-2' >Reset</p>
            <ArrowsClockwise size={24} />
          </div>
          {/* sort by dropdown below */}
          {/* <Dropdown>
              <Dropdown.Toggle variant='link' data-testid='sortByDropdown' focusfirstitemonshow='false' className='sort-btn' id="dropdown-basic">
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu >
                <Dropdown.Item data-testid='sortByRecentBtn' onClick={sortByRecent}>Most Recent</Dropdown.Item>
                <Dropdown.Item data-testid='sortByRelevantBtn' onClick={()=>{handleFilter('')}}>Relevance</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            
          <div>
          <Button className='filter-btn' variant='link' type="button" onClick={handleShowModal} data-testid='showFilterModalBtn'>Filter<SlidersHorizontal size={32}/></Button>
          <FilterModal setFilterParams={setFilterParams} offset={offset} perPage={perPage} setSlice={setSlice} setPageCount={setPageCount} location={location} setLocation={setLocation} distance={distance} setDistance={setDistance} setFilterOnly={setFilterOnly} handleClose={handleCloseModal} myjobs={myjobs}  setmyjobs={setmyjobs} show={showModal}/>
           
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
          
              <Maps user={user} myjobs={myjobs} slice={slice} createPopUp={createPopUp}/>
            
          </>:<>
        
         
            <div className='d-flex flex-row flex-wrap justify-content-center'>
            {noMatches? <><h5>No jobs match this search</h5></>:<>
            
            {showJob()}</>}
            </div>
          <div className='d-flex justify-content-center'>
            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-m-5"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
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
