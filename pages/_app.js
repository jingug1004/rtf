// import React from "react";
// import PropTypes from "prop-types";
// import Head from "next/head";
// import wrapper from "../store/configureStore";
// import "../styles/globals.css";
// import { GlobalStyle } from "../styles/globals.css";
//
// const MyApp = ({ Component, pageProps }) => {
//   return (
//     <>
//       <Head>
//         <meta charSet={"utf-8"} />
//         <title>flow</title>
//       </Head>
//       <GlobalStyle />
//       <Component {...pageProps} />
//     </>
//   );
// };
//
// // MyApp.getInitialProps = async (context) => {
// //   const { ctx, Component } = context;
// //   // console.log("l~ ctx : ", ctx);
// //   // console.dir("l~ Component : ", Component);
// //   let pageProps = {};
// //   if (Component.getInitialProps) {
// //     pageProps = await Component.getInitialProps(ctx);
// //   }
// //
// //   return { pageProps };
// // };
//
// // export default MyApp;
//
// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired, // elementType  = jsx
// };
//
// export default wrapper.withRedux(MyApp);

//

import React from "react";
import Head from "next/head";
import wrapper from ".././store/configureStore";
import PropTypes from "prop-types";

const Test = ({ Component, store }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

Test.propTypes = {
  Component: PropTypes.elementType.isRequired, // elementType  = jsx
};

// next가 redux 와 redux-saga가 적용되어 돌아가게 해준다.
export default wrapper.withRedux(Test);
