import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { gql, useQuery, useMutation } from "@apollo/client";
import { MUTATE_LOCATION } from "../../gql/mutations";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const Location = ({ location, lid }) => {
  const inputRef = useRef(null);
  const [mutateLocation, { loading: nameLoading }] =
    useMutation(MUTATE_LOCATION);
  const uid = localStorage.getItem("id");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleUpdate = handleSubmit((data) => {
    updateLocation();
  });

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  const updateLocation = () => {
    const [place] = inputRef.current.getPlaces();
    const latitude = place.geometry.location.lat().toString();
    const longitude = place.geometry.location.lng().toString();
    const address = place.formatted_address;
    const userId = localStorage.getItem("id");

    console.log(`longitude : ${longitude}`);
    console.log(`latitude: ${latitude}`);
    mutateLocation({
      variables: {
        lid: lid,
        lat: latitude,
        long: longitude,
        address: address,
      },
    })
      .then((value) => {
        window.location.reload(false);
        console.log("location updated successfully");
      })
      .catch((err) => console.log(`error: ${err.message}`));
  };

  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;

  return (
    <div className="mb-4">
      <label className="f">Location</label>

      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                className={`${
                  errors.password ? "text-field-error" : "text-field-signup"
                } `}
                placeholder={location}
                {...register("location", {
                  required: {
                    value: true,
                    message: "*requried",
                  },
                })}
              />
              <button
                onClick={() => {
                  // updateLocation();
                  handleUpdate();
                  // console.log(`lid ${lid}`);
                }}
                className="ml-12 update-btn"
              >
                update
              </button>
            </div>
            {errors.location && (
              <span className="error-message">{errors.location.message}</span>
            )}
          </div>
        </StandaloneSearchBox>
      </LoadScript>
    </div>
  );
};

export default Location;
