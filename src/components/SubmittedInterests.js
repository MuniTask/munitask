import { collection, deleteDoc, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import React, { Fragment, useEffect, useState } from 'react'
import { Accordion, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {db} from '../firebase'
import { titleCase } from '../FunctionStorage';
export default function SubmittedInterests({user}) {
    const [forms, setForms]=useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getForms=async()=>{
        const forms_lst=[]
        const forms_lst2=[]
        const data2=query(collection(db,'interestForms'),where("user_uid", "==", user.uid));
        const querySnapshot = await getDocs(data2);
        querySnapshot.forEach((doc) => {
          const x = doc.id;
          forms_lst.push({...doc.data(), id:x})
        
          });
          for (let x of forms_lst){
            
            let job_title=await(getJob(x.job_id))
            // let job_mun=await(getJob(x.job_id))
            let test=await(getJob(x.job_id)).then(
              forms_lst2.push({...x,...job_title})
            )
          }
          console.log('forms:',forms_lst2);
          if(forms_lst2.length >0){
            setForms([...forms_lst2])
          }
         
    };
    const unsubmit_form=async(form_id)=>{
      await deleteDoc(doc(db, "interestForms", form_id));
      console.log(`succesfully deleted ${form_id}`);
      handleClose();
      getForms();
      // const new_list=[];
      // for (let x of forms){
      //   if (x.id!==form_id){
      //     new_list.append(x)
      //   }
      // }
      // setForms(new_list)
    }
    // const getJob=async(job_id)=>{
    //   const docRef = doc(db, "jobs", job_id);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     return docSnap.data();
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // };
    const getJob=async(job_id)=>{
      console.log('GET JOBS FUNCTION')
      const data = await getDoc(doc(db, "jobs", job_id));
      console.log(data.data())
      const test_array=[data.data()]
      console.log(test_array)
       const newJobsList=[];
      for (let doc of test_array){
        const zip_code=await getZip(doc.municipality)
        const latitude=await getLat(parseFloat(doc.municipality))
        const longitude=await getLng(parseFloat(doc.municipality))
        const logo_url=await getLogo(doc.municipality)
        const skip=await getLng(doc.municipality).then( 
          newJobsList.push({...doc, latitude: latitude, longitude:longitude, zip_code:zip_code, logo_url:logo_url})
        )
      };
      return newJobsList
     
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
    useEffect(()=>{
        getForms();
        
    },[]);
  
  return (
   <>
   {forms?<>
   {forms.map((form, i)=><Fragment key={i}>
    <Accordion >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{titleCase(form[0].title)} - {form[0].municipality} Park District</Accordion.Header>
        <Accordion.Body>
          <div>
         <ul className='responses-list'>
            <li className='mb-2'><Link  to={`/${form.job_id}`} data-testid='linkToJobFromInterestForm' state={{job:form[0]}}>View job listing</Link></li>
            <li><b>Ideal job start:</b></li>
            <li> {form.job_start}</li>
            <div className='mb-3'></div>
            <li><b>Ideal job end:</b></li>
            <li>{form.job_end}</li>
            <div className='mb-3'></div>
            <li><b>Do you have any direct training, certifications, or experience in
              the job you're interested in?</b></li>
              <li> {form.training}</li>
              <div className='mb-2'></div>
            <li><b>Is there anything else you'd like us to know?</b> </li>
            <li>{form.other_info}</li>
         </ul>
         </div>
       
         <div>
         <Button variant="outline-danger" data-testid='deleteInterestFormBtn' onClick={handleShow}>
        Delete
      </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{form[0].title} - {form[0].municipality} Park District</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to unsubmit this interest form? You can't undo this action.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-danger" data-testid='confirmDeleteInterestFormBtn' onClick={()=>unsubmit_form(form.id)}>
            Delete form
          </Button>
        </Modal.Footer>
      </Modal>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
   </Fragment>)}
    
   </>:<>
   <h6>You have not submitted any interests. <Link to='/'>Browse jobs</Link></h6>
   </>}
   
    </>
  )
}
// DELETE BY FORM ID - FIXT HIS.. NOT REGISTERING FORM ID