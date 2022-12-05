import React, { useEffect, useState } from 'react'
import {db} from '../firebase';
import { collection, query, where, getDocs, addDoc, limit } from "firebase/firestore";
import JobItem from '../components/JobItem';

export default function HowItWorks() {

    const searchZip = async (city) => {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
      const data = await res.json()
      console.log(data.features[0]);
  };


  useEffect(() => {
   searchZip('chicago illinois')
  }, []);

  return (
    <div className='page-container' id='demo'></div>
  )
}
