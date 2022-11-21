import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL from 'react-map-gl';

import {GeolocateControl, Map, Marker, NavigationControl, FullscreenControl} from 'react-map-gl';
import {MapPin} from "phosphor-react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { MDBContainer,MDBCol, MDBTabs, MDBTabsLink, MDBTabsItem, MDBRow, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import JobItem from './JobItem';
import { Link } from 'react-router-dom';
export default function Maps({myjobs}) {
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
  
   
  return (
    <div className='map-body d-flex flex-row justify-content-between'>
        <div className='d-flex flex-column'>
            {myjobs.map((job, i)=> <JobItem key={i} myjobs={myjobs} job={job}/>)}
        </div>
    <div  className='map-div mx-auto' >
      
        <Map doubleClickZoom={true} mapboxAccessToken='pk.eyJ1IjoibXVuaXRhc2siLCJhIjoiY2xhYjhmZ3ZpMDFudDNycHFlcDZnNnR2byJ9.XeCgoPpc2GvLlJdJMSqNfA' 
        style={{width:"500px",height:"500px",borderRadius:"15px",border:"2px solid red"}}
        initialViewState={{latitude:lat, longitude:lng, zoom: 6}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
         >
        <Marker mapStyle="mapbox://styles/mapbox/streets-v9"  longitude={lng} latitude={lat}><MapPin size={26} weight="fill" /></Marker>
        {myjobs.map((job, i)=>
        <>
        <Link to={`/${job.id}`} state={{job:job}}><Marker key={i} mapStyle="mapbox://styles/mapbox/streets-v9"  longitude={job.longitude} latitude={job.latitude}>
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
        </>
        )}
        <NavigationControl/>
        <GeolocateControl/>
        <FullscreenControl/>
        </Map>
        
    </div>

    
    </div>
  )
}
