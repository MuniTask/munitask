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
  const  [noMatches, setNoMatches]=useState(false);
  const [constJobs, setConstJobs]=useState();
  const [filterOnly, setFilterOnly]=useState();
  const [keywords, setKeywords]=useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  // const [savedJobs, setSavedJobs]=useState([]);
  const [location, setLocation]=useState();
  const [distance, setDistance]=useState(10);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);
  const jobsRef = collection(db, 'jobs');

  const handleFilter = (search) => {
    setKeywords(search);
  }
 const handleNoMatches=()=>{
  if (myjobs===[]){
    setNoMatches(true)
  }else{
    setNoMatches(false)
  }
 };
const getJobs=async()=>{
  if (globalJobs){
    setmyjobs([...globalJobs]);
    setConstJobs([...globalJobs]);
    setFilterOnly([...globalJobs]);
    setLocation();
    setDistance(10);
  } else if (!globalJobs){
     setLocation();
    setDistance(10);
    // const data = await getDocs(collection(db, 'jobs'));
    // const newJobsList=[];
    const setList=[];
    // let qual='';
    // let resp='';
    // for (let document of data.docs){
    //   try{
   
        // if (document.data().title==='pool maintenance' || document.data().title==='park maintenance'){
        //     qual='Must be 16 years of age or older by your first day of work.-Knowledge of common hand tools, materials, and standard equipment used in maintenance, repair, and construction work.-Knowledge of safety precautions and hazards.-Must be able to work outdoors.-Willing to work in an ever changing environment, sometimes fast or slow.-Openness to grow with a community of seasonal workers.-Must be subject to a background check.'
        //     resp="Helpful to have a valid driver's license to access different locations.-Perform manual labor, such as: clean, carry, climb, drag heavy items, grab, grip, lift heavy and/or awkward equipment, read maps, use protective gear, a two way radio, stand, sit, and walk, have proper alignment.-Follow verbal and written directions.-Communicate with supervisor of any issues.-Willing to work in an ever changing environment, sometimes fast or slow.-Openness to grow with a community of seasonal workers.-Must be subject to a background check.-Prepare for events and activities in parks, recreation fields, and buildings by mowing grass, sweeping, planting and gardening.-Tools to use include, but are not limited to: rake, lawn mower, shovel, scissor, hammer, nails, screwdrivers, ladder, vehicle, garbage can and bags, water hose, etc…"
        // } else if(document.data().title==='golf ranger'){
        //   qual='Friendly upbeat attitude -Willingness to learn and perform.-Customer Service Experience (preferred)'
        //   resp="Be comfortable for long periods of time in direct and indirect sunlight-Start groups at their respective times-Facilitate Pace Of Play on the course-Greet Members and Guests at the tee-Fill coolers with bottled water and ice-Provide excellent customer service to members and guests-Proactively look for opportunities to assist members' & guests' needs-Perform any other duties deemed necessary by a golf professional or golf shop staff-grounds cleanliness and upkeep-Assists members with golf bags, loading and unloading onto carts, club cleaning services, and maintains bag storage system-Provides carts for member and guest play by bringing them to cart staging area, and returning them to cart storage free of debris, towels, scorecards, etc-Operates equipment to retrieve range balls,and arranges baskets and range balls in accordance with approved club standards"
        // }else if(document.data().title==='lifeguard'){
        //   qual='Must be 15 years of age or older.-If you are 15 years old, you must obtain a work permit.-Willing to learn and use customer service skills with a positive attitude.-Willing to work in an ever changing environment, sometimes fast or slow.-Willing to grow with a community of seasonal workers.-Must be subject to a background check. -In some parks, a lifeguard certification is required before working.'
        //   resp="Must be a strong swimmer, must demonstrate by completing all in-water skills.-Knowledge of lifeguard responsibilities preferred.-Complete a swim assessment as a portion of training: 1)Swim 200 yards using front crawl and/or breaststroke 2)Tread for two minutes; one minute without your hands and one minute with your hands 3)Retrieve a 10lb brick from the bottom of the pool (6 feet)-Maintain a safe aquatic operation with prevention techniques which include enforcing pool rules, remaining vigilant at all times by scanning the pool zone, being rescue ready and performing in stressful situations.-Must be capable of implementing the emergency action plan and communicating emergency directions.-Must be able to successfully relay information pool status information to patrons."
        // }else if(document.data().title==='swim instructor'){

        //   qual='Must be 16 years of age or older by your first day of work.-Must have a swim instructor certificate OR complete the certification by your first day of work (we may be able to provide you the training at zero cost to you).-Must possess enthusiasm, creativity and the ability to communicate with people of all ages.-Motivation to teach people with no experience.-Must be flexible, willing to try new ideas and be organized, self-motivated and be consistently punctual.-Willing to learn and use customer service skills with a positive attitude.-Willing to work in an ever changing environment, sometimes fast or slow.-Openness to grow with a community of seasonal workers.-Must be subject to a background check.'
        //   resp="Capable of taking on new responsibilities as required for successful swim program and safety of participants.-Prepare daily swim lessons.-Effectively implement swim lesson plans as appropriate to program level and participants abilities.-Maintain a working knowledge of all general and department safety rules.-Enforce rules and improve public and employee knowledge by preventing or confronting any unsafe behavior.-Maintain a professional appearance and positive attitude.-Continue education and awareness by attending staff meetings and training sessions.-Promote excellent customer service relations with patrons, parents, and anyone visiting the park.-Enforce regulations and safety concerns.-Comply with Park District policies and administrative procedures."
        // }else if(document.data().title==='camp counselor'){

        //   qual='Must be 16 years of age or older by your first day of work.-Must possess enthusiasm, creativity and the ability to communicate with youth of all ages.-Motivation to improve camp participants experience.-Must be flexible, willing to try new ideas and be organized, self-motivated and be consistently punctual.-Willing to learn and use customer service skills with a positive attitude.-Willing to work in an ever changing environment, sometimes fast or slow.-Openness to grow with a community of seasonal workers.-Must be subject to a background check.'
        //   resp="Help implement a weekly schedule for specified camp groups.-Supervise campers with facilitating program rules, regulations and safety concerns.-Work collaboratively with other camp counselors. -Organize and lead a variety of age appropriate activities each week. Activities may include crafts, nature, songs, games, team-building games, swimming, etc…-Travel with camp participants on the bus and walking to various locations.-Identify and respond appropriately to camp participant behavior issues.-Ensure that the camp site is well maintained and organized.-Communicate with parents about their camp participant’s experiences.-Report concerns to Camp Leadership.-Maintain accurate program records including incident reports and daily attendance.-Comply with Park District policies and administrative procedures."
        // }else{
        //   console.log('problem')
        // }
    //     const zip_code=await getZip(document.data().municipality)
    //     const latitude=await getLat(document.data().municipality)
    //     const longitude=await getLng(document.data().municipality)
    //     const park_url=await getUrl(document.data().municipality)
    //     const logo_url=await getLogo(document.data().municipality)
    //     const hash=geohashForLocation([parseFloat(latitude), parseFloat(longitude)])
    //     const skip=await getLng(document.data().municipality).then( 
    //       await updateDoc(doc(db,'jobs',document.id),{_id:document.id,geohash:hash,park_url:park_url,latitude:parseFloat(latitude), longitude:parseFloat(longitude),logo_url:logo_url, zip_code:zip_code}).then(()=>{
    //        console.log('docs updated')
    //       })
         
    //     )
    // }catch(error){
    //   console.log(error);
    //   console.log(document.data())
    // }};
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
  const que=query(collection(db,'parksInfo'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst === null || data_lst.length===0){
    return 0
  }
  const mun_zip=data_lst[0].zip_code;
  return mun_zip;
};  
const getUrl=async(mun)=>{
  const que=query(collection(db,'parksInfo'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst === null || data_lst.length===0){
    return 0
  }
  const park_url=data_lst[0].park_url;
  return park_url;
};  

const getLogo=async(mun)=>{
  const que=query(collection(db,'parksInfo'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst === null || data_lst.length===0){
    return 0
  }
  const mun_logo=data_lst[0].logo_url;
  return mun_logo;
};  

const getLng=async(mun)=>{
const que=query(collection(db,'parksInfo'),where("municipality","==",mun), limit(1));
const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}));
if (data_lst === null || data_lst.length===0){
  return 0
}
const mun_lng=data_lst[0].longitude;
return mun_lng;
};
const getLat=async(mun)=>{
const que=query(collection(db,'parksInfo'),where("municipality","==",mun), limit(1));
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
        return(myjobs.map((job, i)=> <JobItem key={i} createPopUp={createPopUp} constJobs={constJobs} myjobs={myjobs} job={job} user={user}/>))
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

  // const getSavedJobs=async()=>{
  //   if (user.uid){
  //     const userRef=doc(db,"users",user.uid)
  //     const docSnap = await getDoc(userRef);
  //     if (docSnap.exists()) {
  //       setSavedJobs(docSnap.data().saved_jobs);
  //     } else {
  //       console.log("No saved jobs!");
  //     }
  //   }
  // };
 
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
    
  },[])
  // useEffect(()=>{
  //   getSavedJobs();
  // },[])

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

    

        <div  className='d-flex justify-content-end align-items-baseline mb-5 w-75'>
          <div className='d-flex justify-content-end me-2 refresh-jobs-btn' data-testid='refreshJobsBtn' onClick={()=>{getJobs()}}>
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
          <FilterModal location={location} setLocation={setLocation} distance={distance} setDistance={setDistance} setFilterOnly={setFilterOnly} handleClose={handleCloseModal} myjobs={myjobs}  setmyjobs={setmyjobs} show={showModal}/>
           
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
         
              
              <Maps user={user} myjobs={myjobs} createPopUp={createPopUp}/>
            
          </>:<>
        
         
            <div className='d-flex flex-row flex-wrap justify-content-center'>
            {noMatches? <><h5>No jobs match this search</h5></>:<>
            
            {showJob()}</>}
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
