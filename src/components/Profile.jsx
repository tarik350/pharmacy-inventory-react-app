import React, { useRef } from "react";
import Card from "./utils/Card";
import { useForm } from "react-hook-form";
import { gql, useQuery, useMutation } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { UPDATE_NAME, GET_LOCATION } from "../gql/mutations";
import Name from "./Profile/Name";
import Email from "./Profile/Email";
import Phone from "./Profile/Phone";
import Location from "./Profile/Location";
import PharmacyName from "./Profile/PharmacyName";

const GETUSER = gql`
  query getUser($uid: uuid!) {
    users(where: { id: { _eq: $uid } }) {
      email
      name
      pharmacy_name
      phone_number
      users_locations {
        address
      }
    }
  }
`;

const Profile = () => {
  const inputRef = useRef();
  const uid = localStorage.getItem("id");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { data, error, loading } = useQuery(GETUSER, {
    variables: { uid },
  });

  const {
    data: locationData,
    error: locationError,
    loading: locationLoading,
  } = useQuery(GET_LOCATION, {
    variables: {
      uid,
    },
  });

  //MUTATIONS
  const [mutateName, { loading: nameLoading }] = useMutation(UPDATE_NAME);

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  //   data && console.log(data);
  locationData && console.log(locationData);

  return (
    data &&
    locationData && (
      <div className="flex justify-center  mx-[40px] my-[40px]  h-screen ">
        <div className="w-full ">
          <Card>
            <div className="">
              <h1 className="heading-one">Profile</h1>
              <div>
                <Name name={data.users[0].name} />
                <Email email={data.users[0].email} />
                <Phone phone={data.users[0].phone_number} />
                <PharmacyName pname={data.users[0].pharmacy_name} />
                <Location
                  location={data.users[0].users_locations[0].address}
                  lid={locationData.location[0].id}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  );
};

export default Profile;
