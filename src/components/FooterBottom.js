import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { FacebookLogo, InstagramLogo, LinkedinLogo, TiktokLogo, TwitterLogo } from "phosphor-react";
import {Link} from 'react-router-dom';
export default function FooterBottom() {
    return (
      <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>
  
          <div className="me-auto">
            <a href='' className='me-4 text-reset'data-testid='footer-tiktok-link' >
            <TiktokLogo size={32} /> 
            </a>
            <a href='https://www.linkedin.com/company/munitask/about/' data-testid='footer-linkedin-link' className='me-4 text-reset'>
            <LinkedinLogo size={32} />
            </a>
          </div>
        </section>
  
        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h6 className='fw-bold mb-4 text-light'>
                  <MDBIcon icon="gem" className="me-3" />
                  MuniTask
                </h6>
                <p>
                MuniTask™ is a digital marketplace community connecting gig workers to seasonal work with local governments.

                </p>
              </MDBCol >
  
              
  
              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <Link to='/' data-testid='footerJobsLink' className='text-reset'>
                    Jobs
                  </Link>
                </p>
                <p>
                  <Link to='/howitworks' data-testid='footerAboutLink' className='text-reset'>
                    How It Works
                  </Link>
                </p>
                <p>
                  <Link href='/whoweare' className='text-reset'>
                    Who We Are
                  </Link>
                </p>
                <p>
                  <Link to='/termsofservice' className='text-reset'>
                    Terms of Service
                  </Link>
                </p>
                <p>
                  <Link to='/' className='text-reset'>
                    Privacy Policy
                  </Link>
                </p>
                
              </MDBCol>
  
              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                 Chicago, IL 60654, US
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  hello@munitask.com
                </p>
                
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
  
        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2022 Copyright: 
          <a className='text-reset fw-bold' href=''>
            MuniTask
          </a>
        </div>
      </MDBFooter>
    )
  }
  