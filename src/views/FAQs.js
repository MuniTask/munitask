import React from 'react'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAccordion,  MDBAccordionItem
  } from 'mdb-react-ui-kit';
import logo from '../images/munitask-logo.png';
  
export default function FAQs() {
  
  return (
    <>
    <MDBContainer fluid className='p-0 faq-body'>
        <div className='faq-header'>
            <h4>FAQs</h4>
            <h2 className='display-4 pb-2'>Ask us anything</h2>
            <h4>Have any questions? We're here to assist you.</h4>
        </div>
      
      <div className='accordion-container'>
      <MDBAccordion className='faq-accordion bg-light' flush initialActive={1}>
      <MDBAccordionItem className='' collapseId={1} headerTitle={<><img src={logo}  style={{width: 100, height: 100}}/><h4 className='faq-accordion-header'>What are digital platforms?</h4></>}>
      Digital platforms are businesses that match workers' services or goods with customers via apps or websites. 
          For instance, this includes businesses that provide access to: On-demand labor and repair services.
      </MDBAccordionItem>
      <MDBAccordionItem className='' collapseId={2} headerTitle={<><img src={logo}  style={{width: 100, height: 100}}/><h4 className='faq-accordion-header'>What is hourly/gig/freelance work?</h4></>}>
      Gig work is certain activity you do to earn income, often through an app or website (digital platform), like:
          <ul>
            <li>Drive a car for booked rides or deliveries</li>
            <li>Rent out property or part of it</li>
            <li>Run errands or complete tasks</li>
            <li>Sell goods online</li>
            <li>Rent equipment</li>
            <li>Provide creative or professional services</li>
            <li>Provide other temporary, on-demand work</li>
          </ul>
      </MDBAccordionItem>
      <MDBAccordionItem className='' collapseId={3} headerTitle={<><img src={logo}  style={{width: 100, height: 100}}/><h4 className='faq-accordion-header'>What is a gig worker?</h4></>}>
      Gig workers are independent contractors or freelancers who typically do short-term work for an individual or organization. The gig work may be project-based, hourly or part-time, and can either be an ongoing contract or a temporary position.
      </MDBAccordionItem>

      <MDBAccordionItem className='' collapseId={4} headerTitle={<><img src={logo}  style={{width: 100, height: 100}}/><h4 className='faq-accordion-header'>Can I be a gig worker?</h4></>}>
      Yes, we're growing our community. Please join our MuniTask waitlist to learn of gig work in your community.
      </MDBAccordionItem>

      <MDBAccordionItem className='' collapseId={5} headerTitle={<><img src={logo}  style={{width: 100, height: 100}}/><h4 className='faq-accordion-header'>How do I sign up to become a hourly/gig worker in my community?</h4></>}>
      We hope to launch in a community near you. Click on our "sign up" button and tell us your state and zip code so we can email you when we've launched near you!
      </MDBAccordionItem>
      <MDBAccordionItem className='' collapseId={6} headerTitle={<><img src={logo}  style={{width: 100, height: 100}}/><h4 className='faq-accordion-header'>I'm a local government interested in partnering with MuniTask, how do I learn more?</h4></>}>
      Click the "Schedule a Demo" button on our homepage so we can chat soon!

            You may also email us at hello@munitask.com
      </MDBAccordionItem>
      <MDBAccordionItem className='' collapseId={7} headerTitle={<><img src={logo}  style={{width: 100, height: 100}}/><h4 className='faq-accordion-header'>Where may I find more info on this topic?</h4></>}>
      https://www.irs.gov/businesses/gig-economy-tax-center
      </MDBAccordionItem>

     
    </MDBAccordion>
    </div>
    </MDBContainer>
      </>
  )
}
