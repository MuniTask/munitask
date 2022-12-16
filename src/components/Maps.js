import React, { Fragment, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL from 'react-map-gl';

import {GeolocateControl, Map, Marker, NavigationControl, FullscreenControl} from 'react-map-gl';
import {MapPin} from "phosphor-react";
import {db} from '../firebase';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { MDBContainer,MDBCol, MDBTabs, MDBTabsLink, MDBTabsItem, MDBRow, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import JobItem from './JobItem';
import { Link } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';


export default function Maps({myjobs, user, savedJobs, createPopUp}) {
    const [lat, setLat]=useState(41.88);
    const [lng, setLng]=useState(-87.62);

    const [viewState, setViewState]=useState({longitude:41.8781, latitude:-87.6298, width:"100vw", height: "100vh", zoom:10});
    const [viewport, setViewport]=useState({
      width:'100%',
      height: '100%',
      latitude:-87.6298,
      longitude:41.8781,
      zoom: 11
    })  ;
    const [verticalActive, setVerticalActive] = useState('tab1');
    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
          return;
        }
        setVerticalActive(value);
      };
//   const findLat=async(mun)=>{
//         const que=query(collection(db,'parks'),where("municipality","==",mun));
//         const data = await getDocs(que);
        
//         const new_lst=[]
//         data.forEach((doc) => {
//           new_lst.push(doc.data())
//           console.log(doc.id, " => ", doc.data());
//         });
        
//         console.log(new_lst[0].latitude);
//         const mun_lat = new_lst[0].latitude;
//         return  mun_lat 
        
//   }
//   const findLng=async(mun)=>{
//     const que=query(collection(db,'parks'),where("municipality","==",mun));
//         const data = await getDocs(que);
        
//         const new_lst=[]
//         data.forEach((doc) => {
//           new_lst.push(doc.data())
//           console.log(doc.id, " => ", doc.data());
//         });
//         console.log( typeof new_lst[0].longitude)
//         const mun_lng = new_lst[0].longitude;
//         return  mun_lng;
// }
  
useEffect(()=>{
  // findLat('Alsip');
  // findLng('Alsip');
  console.log('hi')
},[])
   
  return (
    <div className='map-body d-flex flex-row '>
        <div className='d-flex flex-column map-scroll mx-auto align-items-center' style={{overflowY:"scroll"}}>
            {myjobs.map((job, i)=> <JobItem className='' createPopUp={createPopUp} savedJobs={savedJobs} key={i} myjobs={myjobs} job={job} user={user}/>)}
        </div>
    <div  className='map-div mx-auto map-1' >
      
        <Map doubleClickZoom={true} mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
        style={{width:"600px",height:"800px",border:"1px solid lightgray"}}
        initialViewState={{latitude:lat, longitude:lng, zoom: 8}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
         >
        {/* <Marker mapStyle="mapbox://styles/mapbox/streets-v9"  longitude={lng} latitude={lat}><MapPin size={26} weight="fill" /></Marker> */}
        {myjobs.map((job, i)=>
        <Fragment key={i}>
        
        <Link to={`/${job.id}`} state={{job:job}}>
          <Marker  mapStyle="mapbox://styles/mapbox/streets-v9"  longitude={job.longitude} latitude={job.latitude}>
        <OverlayTrigger 
            trigger={["hover", "focus"]}
            placement="right" 
            overlay={
                <Popover id="popover-basic">
                  <Popover.Header as="h3">{job.job_description}</Popover.Header>
                  <Popover.Body>
                    {job.municipality} - {job.zip_code}
                  </Popover.Body>
                </Popover>}>
          <MapPin  size={26} weight="fill" />
          </OverlayTrigger>
        </Marker>
        </Link>
        </Fragment>
        )}
        <NavigationControl/>
        <GeolocateControl/>
        <FullscreenControl/>
        </Map>
        
    </div>

    
    </div>
  )
}
