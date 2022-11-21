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
export default function JobViewMap({job}) {
    const [lat, setLat]=useState(41.88);
    const [lng, setLng]=useState(-87.62);

   
  
   
   
  return (
    <div className='map-body d-flex flex-row justify-content-between'>
       
    <div  className='map-div mx-auto' >
      
        <Map doubleClickZoom={true} mapboxAccessToken='pk.eyJ1IjoibXVuaXRhc2siLCJhIjoiY2xhYjhmZ3ZpMDFudDNycHFlcDZnNnR2byJ9.XeCgoPpc2GvLlJdJMSqNfA' 
        style={{width:"500px",height:"500px",borderRadius:"15px",border:"2px solid red"}}
        initialViewState={{latitude:job.longitude, longitude:job.latitude, zoom: 8}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
         >
        <Marker mapStyle="mapbox://styles/mapbox/streets-v9"  longitude={job.longitude} latitude={job.latitude}><MapPin size={20} weight="fill" /></Marker>
       
        <>
       
        </>
        
        <NavigationControl/>
        <GeolocateControl/>
        <FullscreenControl/>
        </Map>
        
    </div>

    
    </div>
  )
}
