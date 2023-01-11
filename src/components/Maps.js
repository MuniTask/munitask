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
import { titleCase } from '../FunctionStorage';


export default function Maps({myjobs, user, createPopUp}) {
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

useEffect(()=>{

 
},[])
  //  style={{width:"600px",height:"800px",border:"1px solid lightgray"}}
  return (
    <div className='map-body d-flex flex-row '>
        <div className='d-flex flex-column map-scroll mx-auto align-items-center' style={{overflowY:"scroll"}}>
            {myjobs.map((job, i)=> <JobItem className='' createPopUp={createPopUp} key={i} myjobs={myjobs} job={job} user={user}/>)}
        </div>
    <div  className='map-div mx-auto ' >
      
        <Map className='map-1' doubleClickZoom={true} mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
        style={{width: '40vw', height: '60vh', border:"1px solid lightgray"}} 
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
                <Popover className='map-popover' id="popover-basic">
                
                  <Popover.Body className='map-popover'>
                    <div className='d-flex flex-row'>
                      <div className='me-2 map-popover' style={{background:'aliceblue'}}> 
                        <img className='popover-img' alt='park logo' src={job.logo_url}/>
                      </div>
                      <div className='me-2'>
                        <b>{job.municipality}</b>
                      </div>
                      <div>
                    {titleCase(job.title)}
                    </div>
                    </div>
                    
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
