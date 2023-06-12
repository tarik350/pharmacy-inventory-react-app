import { gql } from "@apollo/client";

export const GET_MED_COUNT_FOR_EXPIRE_DATE = gql`
  query getMedicineCount($year: String!) {
    medicine(where: { expire_date: { _eq: $year } }) {
      medicine_name
      id
      generic_name
      description
    }
  }
`;

export const GET_STOCK = gql`
  query getStock($stock: Int!) {
    medicine(where: { amount_in_stock: { _lt: $stock } }) {
      catagory
      medicine_name
      expire_date
      amount_in_stock
    }
  }
`;

export const SEARCH_MED = gql`
  query searchMedicine($name: String!) {
    medicine(where: { medicine_name: { _eq: $name } }) {
      weight
      user_id
      sku
      price
      medicine_name
      manufacturer
      id
      generic_name
      expire_date
      description
      catagory
      brand_name
      amount_in_stock
    }
  }
`;
