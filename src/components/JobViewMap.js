import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL from 'react-map-gl';
import {GeolocateControl, Map, Marker, NavigationControl, FullscreenControl} from 'react-map-gl';
import {MapPin} from "phosphor-react";
export default function JobViewMap({job}) {
    const [lat, setLat]=useState();
    const [lng, setLng]=useState();
    const [isTrue, setIsTrue]=useState(false);
    const setLatitude=(job)=>{
      setLat(job.latitude);
      setLng(job.longitude);
      setIsTrue(true)
    }
useEffect(()=>{
  setLatitude(job)
},[job])
  return (
    <div className='map-body d-flex flex-row justify-content-between'>
       
       {isTrue? <>
    <div  className='map-div mx-auto map-2' >
       <Map doubleClickZoom={true} mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
         style={{width: '60vw', height: '30vh', border:"1px solid lightgray"}} 
        initialViewState={{latitude:41.00, longitude:-88.00, zoom:6}}
        mapStyle="mapbox://styles/mapbox/streets-v9" 
         >
        <Marker mapStyle="mapbox://styles/mapbox/streets-v9"  longitude={lng} latitude={lat}><MapPin size={20} weight="fill" /></Marker>
        <>
        </>
        <NavigationControl/>
        <GeolocateControl/>
        <FullscreenControl/>
        </Map>
       
       
    </div>
    </>:<></>}
    </div>
  )
}
