import { MDBContainer, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import React, { useState } from "react";

export default function InterestForm({ writeInterestForm,job,user }) {
  const [startDate, setStartDate] = useState(new Date());
  const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
    "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
  const illinois_cities = [];

  return (
    <MDBContainer fluid>
      <form onSubmit={(e) => { writeInterestForm(e); }} >
          <div className="d-flex flex-column mb-4">
            <div className="form-group mb-3">
              <label htmlFor="start">Ideal job start date:</label>
              <input type="date" id="start" className="form-control" name="job_start" min="2022-01-01" max="2024-01-01" />
              {job._id? <><input value={job._id} type='hidden' name='job_id'/></>:<></>}
              {user.uid?<><input value={user.uid} type='hidden' name='user_uid'/></>:<></>}
            </div>
            <div className="form-group ">
              <label htmlFor="end">Ideal job end date:</label>
              <input type="date" id="end" className="form-control" name="job_end"
                min="2022-01-01"
                max="2024-01-01" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="certifications">
              Do you have any direct training, certifications, or experience in
              the job you're interested in?
            </label>
            <textarea name="certifications" className="form-control"  id="certifications" rows="5" cols="50" ></textarea>
          </div>
          
          <div>
            <label htmlFor="other-info">Is there anything else you'd like us to know? </label>
            <textarea name="other_info" className="form-control" id="other_info" rows="5" cols="50" ></textarea>
          </div>
      

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </MDBContainer>
  );
}
