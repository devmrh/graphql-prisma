import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
//import Home from '!/containers/home';
import React from "react";
import { getDataFromTree } from "react-apollo-graphql";
import { initializeApollo } from "../lib/apollo";
import { initializeStore } from "../lib/redux";

//import { ApolloProvider } from '@apollo/client';

/**
 * Component to show the home container.
 */
class App extends React.Component {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //Anything returned here can be access by the client
    // return {pageProps: pageProps};

    let serverState = {};
    if (!process.browser) {
      const apollo = initializeApollo();
      const redux = initializeStore(apollo);
      // Run all graphql queries
      const app = (
        <Provider store={redux}>
          <ApolloProvider client={apollo}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      );
      await getDataFromTree(app);
      const state = redux.getState();
      serverState = {
        apollo: {
          // Make sure to only include Apollo's data state
          data: state.apollo.data,
        },
      };
    }
    return {
      serverState,
      pageProps ,
    };
  }

  // constructor(props) {
  //   super(props);
  //   this.apollo = initializeApollo();
  //   this.store = initializeStore(this.apollo, props.serverState);
  // }

  render() {
    const { Component, pageProps, store } = this.props;
    const apollo = initializeApollo();
    const redux = initializeStore(apollo);
    return (
      <Provider store={store}>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
