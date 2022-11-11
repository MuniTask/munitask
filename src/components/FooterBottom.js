import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo } from "phosphor-react";
export default function FooterBottom() {
    return (
      <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>
  
          <div className="me-auto">
            <a href='https://www.facebook.com/MuniTask/' className='me-4 text-reset '>
            <FacebookLogo  size={32} />
            </a>
            <a href='https://twitter.com/MuniTask' className='me-4 text-reset'>
            <TwitterLogo size={32} />
            </a>
            <a href='https://www.instagram.com/muni_task/' className='me-4 text-reset'>
            <InstagramLogo size={32} />
            </a>
            <a href='https://www.linkedin.com/company/munitask/about/' className='me-4 text-reset'>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                 
                </p>
              </MDBCol >
  
              
  
              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Jobs
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    About
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Mission
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Help
                  </a>
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
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
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
  