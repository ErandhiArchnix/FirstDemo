import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  LocationButton,
  ButtonContainer,
  Modal,
  ModalContent,
  CloseButton,
  MapContainer,
  SaveButtton,
} from "../styles/componentStyles/LocationUpdateButtonStyles";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";

function LocationUpdateButton({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationId, setLocationId] = useState();
  const [initialLocation, setIntialLocation] = useState();
  const [clickedLatLng, setClickedLatLng] = useState(initialLocation);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/getUser/${id}`)
      .then((res) => {
        setLocationId(res.data[0].location_id);
        if (locationId === 0) {
          setIntialLocation(null);
        } else {
          axios
            .get(`http://localhost:8000/api/user/getLocation/${locationId}`)
            .then((res) => {
              setIntialLocation({
                lat: res.data[0].latitude,
                lng: res.data[0].longitude,
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, [id, locationId]);

  useEffect(() => {
    if (initialLocation) {
      setClickedLatLng(initialLocation);
    }
  }, [initialLocation]);

  const handleMapClick = (e) => {
    setClickedLatLng({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleSave = () => {
    if (locationId === 0) {
      axios
        .post("http://localhost:8000/api/user/createLocation", clickedLatLng)
        .then((res) => {
          console.log(res.data.insertId);
          const newLocationId = { location_id: res.data.insertId };
          axios
            .put(
              `http://localhost:8000/api/user/updateUser/${id}`,
              newLocationId
            )
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      console.log(clickedLatLng);
      axios
        .put(
          `http://localhost:8000/api/user/updateLocation/${locationId}`,
          clickedLatLng
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
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
                  center={clickedLatLng}
                  zoom={2}
                  onClick={handleMapClick}
                >
                  {console.log(locationId)}
                  {console.log(initialLocation)}
                  {clickedLatLng && <Marker position={clickedLatLng} />}
                </GoogleMap>
                {console.log(clickedLatLng)}
              </LoadScript>
            </MapContainer>
            <SaveButtton onClick={handleSave}>Save</SaveButtton>
          </ModalContent>
        </Modal>
      )}
    </ButtonContainer>
  );
}

export default LocationUpdateButton;
