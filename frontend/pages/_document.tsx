import React from 'react';
import  Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { render } from 'nexus-plugin-prisma/dist/schema/typegen';


export default class MyDocument extends Document<any> {

  static async getInitialProps(ctx){
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {

      // wraps the collectStyle provider around our <App/>
      ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
          })



      // extract the initial props that may be present.
      const initialProps = await Document.getInitialProps(ctx);


      // returning the original prop together with our styled components.
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            { sheet.getStyleElement() }
          </>
        )
      }


    } finally {
      sheet.seal()
    }

  }
  render(){
    return (
      <html>
        <Head>
            { this.props.styleTags /* rendering the actually stylesheet */ }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
