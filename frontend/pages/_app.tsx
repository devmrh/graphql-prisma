import React from "react";

import App from "next/app";

import Head from "next/head";

import { ThemeProvider, createGlobalStyle } from "styled-components";

export interface IThem {
  niceBlack: string;
}

export interface IThemeWrapper {
  theme: IThem
}

export const theme: IThem  = {
  niceBlack: "#001F3F"
}

const GlobalStyle = createGlobalStyle<IThemeWrapper>`
body {
  margin: 0 auto;
  color: ${props => props.theme.niceBlack}
}
`

export default class MyApp extends App {

  render(){
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>GraphQL Job Board</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle>
          </GlobalStyle>
              <Component { ...pageProps } />
        </ThemeProvider>
      </React.Fragment>
    );
  }


}