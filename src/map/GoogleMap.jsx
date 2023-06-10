import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const Map = () => {
  console.log("building");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDgNVT-sCtfUn1TPAuF8ompxW_gMlA5uLY",
  });
  console.log(isLoaded);
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="App">
      <h1>headign </h1>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <div className="border-2">
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}
          >
            <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default Map;
