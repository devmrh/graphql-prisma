import'../style.css'

import { ThemeProvider, createGlobalStyle } from "styled-components";

import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import Head from "next/head";
import  Header  from '../components/Layouts/Header';
import { NormalizedCache } from "apollo-boost";
import { Provider } from 'react-redux'
import React from "react";
import { useApollo } from '../lib/apollo'
import { useStore } from '../lib/redux'
import withApollo from "../hooks/withApollo";
//import App from "next/app";
import withRedux from 'next-redux-wrapper';
import { wrapper }  from '../store/store';
import App, {AppInitialProps, AppContext} from 'next/app';
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


// const App = ({ Component, pageProps }) => {
//    //const store = useStore(pageProps.initialReduxState)
//     const apolloClient = useApollo(pageProps.initialApolloState)
//     const store = useStore(pageProps.initialReduxState)
//    // console.log(apolloClient);
//     return (
//       <React.Fragment>
//         <Head>
//           <title>GraphQL</title>
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//         </Head>
//         {/* adds the apollo provider to provide it's children with the apollo scope. */}
//         <Provider store={store}>
//         <ApolloProvider client={apolloClient}>
//           <ThemeProvider theme={theme}>
//             <GlobalStyle />
//             <Header></Header>
//             <Component  {...pageProps} />
//           </ThemeProvider>
//         </ApolloProvider>
//         </Provider>
//       </React.Fragment>
//     );

// }
//export default wrapper.withRedux(App)
//export default wrapper.withRedux(App);
// before exporting our App we wrapp it with our own withApollo provider to have access to the our rehydrated apollo client.
//export default withApollo(MyApp);





class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({Component, ctx}: AppContext) => {
      // Keep in mind that this will be called twice on server, one for page and second for error page
      ctx.store.dispatch({type: 'APP', payload: 'was set in _app'});

      return {
          pageProps: {
              // Call page-level getInitialProps
              ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
              // Some custom thing for all pages
              pageProps: ctx.pathname,
          },
      };
  };

  public render() {
      const {Component, pageProps} = this.props;
   //   const apolloClient = useApollo(pageProps.initialApolloState)

      return (
        <ApolloProvider client={useApollo}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header></Header>
          <Component  {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
      )
  }
}

export default wrapper.withRedux(WrappedApp);