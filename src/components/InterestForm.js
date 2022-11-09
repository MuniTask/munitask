import { MDBContainer, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import React, { useState } from "react";

export default function InterestForm({ writeInterestForm }) {
  const [startDate, setStartDate] = useState(new Date());
  const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
    "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
  const illinois_cities = [];

  return (
    <MDBContainer fluid>
      <form onSubmit={(e) => { writeInterestForm(e); }} >
        <div className="form-row mb-3">
          <div className="form-group d-flex flex-row">
            <div className="w-25 me-4">
              <label htmlFor="first_name">First Name</label>
              <input name="first_name" type="text" className="form-control " id="first_name" placeholder="First Name" />
            </div>
            <div className="w-25 me-4">
              <label htmlFor="last_name">Last Name</label>
              <input name="last_name" type="text" className="form-control " id="last_name" placeholder="Last Name" />
            </div>
            <div className="w-25">
              <label htmlFor="inputEmail4">Email</label>
              <input name="email" type="email" className="form-control" id="inputEmail4" placeholder="Email" />
            </div>
          </div>
          <div className="form-group col-md-2 mt-3">
            <label htmlFor="birthday">Birthday</label>
            <input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" />
          </div>
        </div>

        <div className="form-group d-flex flex-row mb-5">
          <div className="w-25 me-4">
            <label htmlFor="inputState">State</label>
            <select name="state" id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>Illinois</option>
            </select>
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputCity">City</label>
            <input name="city" type="text" className="form-control" id="inputCity" />
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputZip">Zip</label>
            <input name="zip" type="text" className="form-control" id="inputZip" />
          </div>
        </div>

          <div className="d-flex flex-row justify-content-between mb-5">
            <label htmlFor="lifeguard">lifeguard</label>
            <input className="job_pref" type="checkbox" id="lifeguard" name="lifeguard" />
            <br />

            <label htmlFor="swim-instructor">swim instructor</label>
            <input className="job_pref" type="checkbox" id="swim-instructor" name="swim-instructor" />
            <br />

            <label htmlFor="camp-counselor">camp counselor</label>
            <input className="job_pref" type="checkbox" id="camp-counselor" name="camp-counselor" />
            <br />

            <label htmlFor="park-field-maintenance">
              {" "}
              park/field maintenance
            </label>
            <input type="checkbox" id="park-field-maintenance" name="park-field-maintenance" />
            <br />

            <label htmlFor="pool-maintenance">pool maintenance</label>
            <input className="job_pref" type="checkbox" id="pool-maintenance" name="pool-maintenance" />
            <br />

            <label htmlFor="golf-ranger">golf ranger</label>
            <input className="job_pref" type="checkbox" id="golf-ranger" name="golf-ranger" />
            <br />
          </div>
          <div className="d-flex flex-row mb-5">
            <div className="form-group w-25 me-4">
              <label htmlFor="inputZip">Preferred job location zip code</label>
              <input name="job_zip" type="text" className="form-control" id="inputZip" />
            </div>
            <div className="form-group w-25 me-4">
              <label htmlFor="start">Job start date:</label>
              <input type="date" id="start" className="form-control" name="trip-start" min="2022-01-01" max="2024-01-01" />
            </div>
            <div className="form-group w-25">
              <label htmlFor="end">Job end date:</label>
              <input type="date" id="end" className="form-control" name="trip-end"
                min="2022-01-01"
                max="2024-01-01" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="certifications">
              Do you have any direct training, certifications, or experience in
              the job you're interested in?{" "}
            </label>
            <textarea name="textarea" className="form-control" id="certifications" rows="5" cols="50" ></textarea>
          </div>
          <div className="d-flex flex-row">
            <p className="m-2">
              Do you want to learn more about park and recreation seasonal jobs
              and how to get hired?{" "}
            </p>
            <label className="m-2" htmlFor="yes">
              Yes
            </label>
            <input className="m-2" type="checkbox" id="yes" name="yes" />
            <br />
            <label className="m-2" htmlFor="no">
              No
            </label>
            <input className="m-2" type="checkbox" id="no" name="no" />
            <br />
            <label className="m-2" htmlFor="maybe">
              Maybe Later
            </label>
            <input className="m-2" type="checkbox" id="maybe" name="maybe" />
            <br />
          </div>
          <div className="d-flex flex-row mb-3">
            <p className="m-2">
              What's the best way for us to follow up with you?{" "}
            </p>
            <label className="m-2" htmlFor="phone">
              Phone call
            </label>
            <input className="m-2" type="checkbox" id="phone" name="phone" />
            <br />
            <label className="m-2" htmlFor="text">
              Text message
            </label>
            <input className="m-2" type="checkbox" id="text" name="text" />
            <br />
            <label className="m-2" htmlFor="email">
              Email
            </label>
            <input className="m-2" type="checkbox" id="email" name="email" />
            <br />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="social">
              Share your fav social media and handle/username.
            </label>
            <input name="" type="text" className="form-control" id="social" placeholder="..." />
          </div>
          <div>
            <label htmlFor="other-info">Any else you'd like us to know? </label>
            <textarea name="textarea" className="form-control" id="other-info" rows="5" cols="50" ></textarea>
          </div>
      

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </MDBContainer>
  );
}
