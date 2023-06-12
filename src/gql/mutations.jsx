import { gql, useQuery } from "@apollo/client";

export const UPDATE_NAME = gql`
  mutation ($uid: uuid!, $name: String!) {
    update_users(where: { id: { _eq: $uid } }, _set: { name: $name }) {
      returning {
        name
      }
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation ($uid: uuid!, $email: String!) {
    update_users(where: { id: { _eq: $uid } }, _set: { email: $email }) {
      returning {
        email
      }
    }
  }
`;
export const UPDATE_PHONE = gql`
  mutation ($uid: uuid!, $phone: String!) {
    update_users(where: { id: { _eq: $uid } }, _set: { phone_number: $phone }) {
      returning {
        phone_number
      }
    }
  }
`;
export const UPDATE_PNAME = gql`
  mutation ($uid: uuid!, $pname: String!) {
    update_users(
      where: { id: { _eq: $uid } }
      _set: { pharmacy_name: $pname }
    ) {
      returning {
        pharmacy_name
      }
    }
  }
`;

export const GET_LOCATION = gql`
  query getLocation($uid: uuid) {
    location(where: { user_id: { _eq: $uid } }) {
      id
    }
  }
`;

export const MUTATE_LOCATION = gql`
  mutation ($lid: uuid, $lat: String!, $long: String!, $address: String!) {
    update_location(
      where: { id: { _eq: $lid } }
      _set: { latitude: $lat, longitude: $long, address: $address }
    ) {
      returning {
        latitude
        address
        longitude
      }
    }
  }
`;
