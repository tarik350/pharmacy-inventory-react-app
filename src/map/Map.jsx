import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
const MapContainer = (props) => {
  const [map, setMap] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [activeMarker, setActiveMarker] = useState({});
  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
    setShowingInfoWindow(true);
  };
  const onMapClicked = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };
  return (
    <Map
      google={props.google}
      zoom={14}
      initialCenter={{ lat: 40.854885, lng: -88.081807 }}
      onReady={(mapProps, map) => setMap(map)}
      onClick={onMapClicked}
    >
      <Marker onClick={onMarkerClick} name={"Current location"} />
      <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
        <div>
          <h1>{selectedPlace.name}</h1>
        </div>
      </InfoWindow>
    </Map>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyDgNVT-sCtfUn1TPAuF8ompxW_gMlA5uLY",
})(MapContainer);
