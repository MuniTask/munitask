import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL from 'react-map-gl';
import {GeolocateControl, LngLat, Map, MapProvider, Marker, NavigationControl, FullscreenControl} from 'react-map-gl';
import {MapPin} from "phosphor-react";
import { MapboxMarker } from 'react-map-gl/dist/esm/types';
import { MDBContainer,MDBCol, MDBTabs, MDBTabsLink, MDBTabsItem, MDBRow, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import JobItem from './JobItem';
export default function Maps({myjobs}) {
    const [lng, setLng]=useState(41.8781);
    const [lat, setLat]=useState(-87.6298);
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
    <div className='map-body d-inline-flex'>
        <div className='d-flex flex-column'>
            {myjobs.map((job, i)=> <JobItem key={i} myjobs={myjobs} job={job}/>)}
        </div>
    <div  className='map-div' >
      
        <Map mapboxAccessToken='pk.eyJ1IjoibXVuaXRhc2siLCJhIjoiY2xhYjhmZ3ZpMDFudDNycHFlcDZnNnR2byJ9.XeCgoPpc2GvLlJdJMSqNfA' 
        style={{width:"500px",height:"500px",borderRadius:"15px",border:"2px solid red"}}
        initialViewState={{longitude:lng, latitude:lat}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        zoom={0} >
        <Marker longitude={41.8781} latitude={-87.6298}><MapPin size={32} weight="fill" /></Marker>
        <NavigationControl/>
        <GeolocateControl/>
        <FullscreenControl/>
        </Map>
    </div>

    
    </div>
  )
}
