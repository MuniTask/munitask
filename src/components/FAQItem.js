
  import React from 'react'
  import {
      MDBContainer,
      MDBCard,
      MDBCardTitle,
      MDBCardText,
      MDBCardBody,
      MDBCardHeader,
      MDBCol,
      MDBRow
    } from 'mdb-react-ui-kit';
  
  export default function FAQItem({faqs}) {
    return (
      
  
  <>
  <MDBContainer>
      <MDBRow>
      {faqs.map((q)=>
          <MDBCol lg='6' xl='4' md='6' sm='12'>
          <MDBCard shadow='0' border='light' background='white' className='faq-card mb-3'>
              <MDBCardBody >
                  <MDBCardImage src={logo} className='w-25' alt='...' position='top' />
                  <MDBCardTitle>What are digital platforms?</MDBCardTitle>
                  <MDBCardText>
                  Digital platforms are businesses that match workers' services or goods with customers via apps or websites. 
                  For instance, this includes businesses that provide access to: On-demand labor and repair services.
                  </MDBCardText>
              </MDBCardBody>
           </MDBCard>
          </MDBCol>
          )}
      </MDBRow>
  </MDBContainer>
  
    </>
    )
  }
  