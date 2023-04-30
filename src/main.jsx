import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.css";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

// const client = new ApolloClient({
//   uri: "https://flexible-wren-26.hasura.app/v1/graphql",
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: "https://flexible-wren-26.hasura.app/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      "x-hasura-admin-secret":
        "ATTrUy0HHKdRxhQxjBrKSu3AEGW3SdmBZmj7paW5tezpEik5xMTcTnxckOVJI9Fz",
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
