import React, { useEffect, useState } from 'react'
import {db} from '../firebase';
import { collection, query, doc, where, getDocs, addDoc, limit, getDoc, updateDoc, orderBy, startAfter, startAt, endAt } from "firebase/firestore";
import JobItem from '../components/JobItem';
import { getAuth, signInWithPopup,GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { distanceBetween, geohashForLocation, geohashQueryBounds } from 'geofire-common';

export default function HowItWorks({}) {
  const  [myjobs, setmyjobs]=useState()
  const [constJobs, setConstJobs]=useState()
  const getJobs=async()=>{
    const data = await getDocs(collection(db, 'jobs'));
    const newJobsList=[];
    const setList=[];
    for (let document of data.docs){
      try{
      if (!document.data().zip_code){
        const zip_code=await getZip(document.data().municipality)
        const latitude=await getLat(document.data().municipality)
        const longitude=await getLng(document.data().municipality)
        let logo_url=''
        const hash=geohashForLocation([latitude, longitude])
        if (document.data().logo_url){
          logo_url=await getLogo(document.data().municipality)
        } else{
          logo_url='https://softr-prod.imgix.net/applications/3bdd2066-32ff-463d-89d7-cd3c467341d3/assets/addfbe72-6b47-44fa-91fe-713256d4bfba.png'
        }
       
        const skip=await getLng(document.data().municipality).then( 
          await updateDoc(doc(db,'jobs',document.data()._id),{geohash:hash, latitude:latitude, longitude:longitude,logo_url:logo_url, zip_code:zip_code}).then(()=>{
           console.log('docs updated')
          })
          // newJobsList.push({...doc.data(), latitude: latitude, longitude:longitude, zip_code:zip_code, logo_url:logo_url})
        )
      }
      
    }catch(error){
      console.log('no upate')
    }
     
    };
    const data2 = await getDocs(collection(db, 'jobs'));
    data2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setList.push(doc.data())
    });
    setmyjobs([...setList])
    setConstJobs([...setList])
};


const getZip=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst == null || data_lst.length==0){
    return 0
  }
  const mun_zip=data_lst[0].zip_code;
  return mun_zip;
};  

const getLogo=async(mun)=>{
  const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
  const data2 = await getDocs(que);
  const data_lst=data2.docs.map((doc)=>({...doc.data()}));
  if (data_lst == null || data_lst.length==0){
    return 0
  }
  const mun_logo=data_lst[0].logo_url;
  return mun_logo;
};  

const getLng=async(mun)=>{
const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}));
if (data_lst == null || data_lst.length==0){
  return 0
}
const mun_lng=data_lst[0].longitude;
return mun_lng;
};
const getLat=async(mun)=>{
const que=query(collection(db,'parks'),where("municipality","==",mun), limit(1));
const data2 = await getDocs(que);
const data_lst=data2.docs.map((doc)=>({...doc.data()}));

if (data_lst == null || data_lst.length==0){
  return 0
}
const mun_lat=data_lst[0].latitude;
return mun_lat;
};

const getBounds=async(lat,lng,radius)=>{
    const bounds= geohashQueryBounds([lat,lng],radius);
    const promises=[]
    const jobsRef=collection(db,'jobs')
    for (const b of bounds){
      const q = query(jobsRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      promises.push(doc.data())

});
  
    }
    console.log(promises)
    const matchingDocs=[];
    for (const snap of promises){
      const snapLat = snap.latitude
      const snapLng = snap.longitude
      const distanceInKm = distanceBetween([snapLat, snapLng], [lat,lng]);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radius) {
        matchingDocs.push(snap);
      }
      console.log('matching docs',matchingDocs)
    }
}
  
useEffect(()=>{
  getJobs();
  // getBounds(41.9, -87.9, 5000)
},[])
useEffect(()=>{
  window.dataLayer.push({
    event: 'pageview',
    page:{
      title:'howItWorks'
    }
})},[])
  return (
    <>
    </>
  )
}
