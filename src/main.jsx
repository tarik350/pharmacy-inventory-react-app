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
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { ShowModalProvider } from "./components/state/show-modal";

import { setContext } from "@apollo/client/link/context";
import Auth from "./components/Auth";

// import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
// import { WebSocket } from "ws";
// const client = new ApolloClient({
//   uri: "https://flexible-wren-26.hasura.app/v1/graphql",
//   cache: new InMemoryCache(),
// });

const token = localStorage.getItem("token");
const uid = localStorage.getItem("id");

const httpLink = createHttpLink({
  uri: "https://flexible-wren-26.hasura.app/v1/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://flexible-wren-26.hasura.app/v1/graphql/v1/graphql",
    options: {
      reconnect: true,
      // lazy: true,
      connectionParams: {
        // headers: {
        //   authorization: `Bearer ${token}`,
        // },
        authToken: `Bearer ${token}`,
      },
    },
    // webSocketImpl: WebSocket,
  })
);

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

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  // link: authLink.concat(splitLink),
  link: splitLink,
  cache: new InMemoryCache(),
  headers: {
    authorization: token ? token : "",
  },
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
