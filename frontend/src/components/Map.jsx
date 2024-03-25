import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import {
  MapContainer,
  Container,
  TopContainer,
} from "../styles/componentStyles/MapStyles";

function HomeMap() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/locations/getAllLocations')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  return (
    <Container>
      <TopContainer>
        You are Just... <br></br>One Step Away
      </TopContainer>
      <MapContainer>
        <LoadScript googleMapsApiKey="AIzaSyAg8TOi8OhdM1NxVymss1CEqZD3VRT342w">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "600px" }}
            center={{ lat: 0, lng: 0 }}
            zoom={2}
          >
             {locations.map(marker => (
          <Marker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => setSelectedLocation(marker)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2>{selectedLocation.location_id}</h2>
              <p>Additional information about the location</p>
            </div>
          </InfoWindow>
        )}
          </GoogleMap>
        </LoadScript>
      </MapContainer>
    </Container>
  );
}

export default HomeMap;
