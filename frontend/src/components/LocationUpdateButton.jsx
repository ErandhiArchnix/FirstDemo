import React, { useState, useEffect } from "react";
// import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  LocationButton,
  ButtonContainer,
  Modal,
  ModalContent,
  CloseButton,
  MapContainer,
} from "../styles/componentStyles/LocationUpdateButtonStyles";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
function LocationUpdateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedLatLng, setClickedLatLng] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //   const [locations, setLocations] = useState([]);
  //   const [selectedLocation, setSelectedLocation] = useState(null);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8000/api/user/getAllLocations")
  //       .then((response) => {
  //         console.log(response.data);
  //         setLocations(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching locations:", error);
  //       });
  //   }, []);

  const handleMapClick = (e) => {
    setClickedLatLng({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return (
    <ButtonContainer>
      <LocationButton onClick={openModal}>
        <EditLocationAltIcon fontSize="large" />
      </LocationButton>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <MapContainer>
              <LoadScript googleMapsApiKey="AIzaSyAg8TOi8OhdM1NxVymss1CEqZD3VRT342w">
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{ lat: 0, lng: 0 }}
                  zoom={2}
                  onClick={handleMapClick}
                >
                  {clickedLatLng && <Marker position={clickedLatLng} />}
                </GoogleMap>
                {console.log(clickedLatLng)}
              </LoadScript>
            </MapContainer>
          </ModalContent>
        </Modal>
      )}
    </ButtonContainer>
  );
}

export default LocationUpdateButton;
