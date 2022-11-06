import { MDBCol } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import JobItem from '../components/JobItem'
import JobSearch from '../components/JobSearch'
import JobTest from '../components/JobTest'

import { Container, Panel } from 'react-scrolling-panel';

export default function Test() {
    const  [jobs, setjobs]=useState(['Job1','job2','job3', 'job4',  'job5', 'job6','job7','job8','job9','Job1','job2','job3', 'job4',  'job5', 'job6','job7','job8','job9'])
  

    
    return (
      <div className='page-container'>
  
  { <JobSearch />}
  
        <div  className='scroll'>

       <Container  direction='vertical'>

       <Panel  size={3}>
        {<JobTest jobs={jobs}/>}
        </Panel>
        <Panel flex={2}>
        {<JobTest jobs={jobs}/>}
        </Panel>
        </Container>
        </div>
      
      </div>
    )
  }

  

