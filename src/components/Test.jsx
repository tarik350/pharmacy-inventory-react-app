import { gql, useSubscription } from "@apollo/client";

const Medicine = gql`
  subscription getMedicine {
    medicine {
      id
      amount_in_stock
      brand_name
      catagory
      description
      expire_date
      generic_name
      manufacturer
      medicine_name
      price
      sku
      user_id
      weight
    }
  }
`;

const Test = () => {
  const { loading, data, error } = useSubscription(Medicine);

  console.log(`data: ${data}`);
  console.error(error);

  return <h4>New comment: {!loading && data}</h4>;
};

export default Test;
