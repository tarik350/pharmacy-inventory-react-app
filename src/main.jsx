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
import { Auth0Provider } from "@auth0/auth0-react";
import { ShowModalProvider } from "./components/state/show-modal";

import { setContext } from "@apollo/client/link/context";
import Auth from "./components/Auth";

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
  const uid = localStorage.getItem("id");

  console.log(`token from main: ${token}`);
  console.log(`user id : ${uid} `);

  // return the headers to the context so httpLink can read them

  if (token) {
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  } else {
    return {
      headers: {},
    };
  }
  // return {
  //   headers: {
  //     // "x-hasura-admin-secret":
  //     //   "ATTrUy0HHKdRxhQxjBrKSu3AEGW3SdmBZmj7paW5tezpEik5xMTcTnxckOVJI9Fz",
  //     // authorization: token ? `Bearer ${token}` : ``,
  //   },
  // };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLINET_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ShowModalProvider>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
          {/* <Auth /> */}
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  </ShowModalProvider>
);
