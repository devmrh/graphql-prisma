import React from "react";

import App from "next/app";

import Head from "next/head";

import { ThemeProvider, createGlobalStyle } from "styled-components";

import { ApolloProvider } from "@apollo/react-hooks";

import withApollo from "../hooks/withApollo";

import { NormalizedCache } from "apollo-boost";

import { ApolloClient } from "@apollo/client";

import  Header  from '../components/Layouts/Header';

import'../style.css'

import { Provider } from 'react-redux'
import { useStore } from '../lib/redux'
import { useApollo } from '../lib/apollo'

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

.overlay {
  position: fixed;
  display: block;
  overflow: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 999;
  cursor: pointer;
}

.content {
      margin: 15% auto;
      background-color: white;
      border-radius: 0.25rem;
      width: 50vw;
      padding: 2rem;
      position: relative;
}


`;

interface IProps {
  apollo: ApolloClient<NormalizedCache>;
}

class MyApp extends App<IProps> {
  render() {
    // instead of creating a client here, we use the rehydrated apollo client provided by our own withApollo provider.
    const { Component, pageProps } = this.props;
    const store = useStore(pageProps.initialReduxState)
    const apolloClient = useApollo(pageProps.initialApolloState)

    return (
      <React.Fragment>
        <Head>
          <title>GraphQL Job Board</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {/* adds the apollo provider to provide it's children with the apollo scope. */}
        <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Header></Header>
            <Component  {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
        </Provider>
      </React.Fragment>
    );
  }
}
// before exporting our App we wrapp it with our own withApollo provider to have access to the our rehydrated apollo client.
export default withApollo(MyApp);
