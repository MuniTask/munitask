import React from 'react';
import {GoogleMap, Wrapper} from "@googlemaps/react-wrapper";
export default function GMap() {
  return (
    <div>
        <Wrapper apiKey='AIzaSyD1gHg23bJaWBILxjb6twOZOhONx9fdBP0' render={render}>
            <YourComponent/>
          </Wrapper>
    </div>
  )
}
