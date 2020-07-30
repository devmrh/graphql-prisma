import React from "react";

import App from "next/app";

import Head from "next/head";

import { ThemeProvider, createGlobalStyle } from "styled-components";

import { ApolloProvider } from "@apollo/react-hooks";

import withApollo from "../hooks/withApollo";

import { NormalizedCache } from "apollo-boost";

import { ApolloClient } from "@apollo/client";
export interface IThem {
  niceBlack: string;
}

export interface IThemeWrapper {
  theme: IThem;
}

export const theme: IThem = {
  niceBlack: "#001F3F",
};

const GlobalStyle = createGlobalStyle<IThemeWrapper>`
body {
  margin: 0 auto;
  color: ${(props) => props.theme.niceBlack}
}
`;

interface IProps {
  apollo: ApolloClient<NormalizedCache>;
}

class MyApp extends App<IProps> {
  render() {
    // instead of creating a client here, we use the rehydrated apollo client provided by our own withApollo provider.
    const { Component, pageProps, apollo } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>GraphQL Job Board</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {/* adds the apollo provider to provide it's children with the apollo scope. */}
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}
// before exporting our App we wrapp it with our own withApollo provider to have access to the our rehydrated apollo client.
export default withApollo(MyApp);
