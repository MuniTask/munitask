import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL from 'react-map-gl';
export default function Maps() {
    const [viewport, setViewport]=useState({
        latitude:40.6331,
        longitude:89.3985,
        width:window.innerWidth,
        height:window.innerHeight,
        zoom:10
    })
  return (
    <div className='map-body'>
    <div >
        <ReactMapGL className='map-div' {...viewport} onViewportChange={(newview)=>setViewport(newview)} mapboxAccessToken='pk.eyJ1IjoibXVuaXRhc2siLCJhIjoiY2xhYjhmZ3ZpMDFudDNycHFlcDZnNnR2byJ9.XeCgoPpc2GvLlJdJMSqNfA'>Markers here</ReactMapGL>
    </div>
    </div>
  )
}
