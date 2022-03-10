import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// MyApp.getInitialProps = async (context) => {
//   const { ctx, Component } = context;
//   // console.log("l~ ctx : ", ctx);
//   // console.dir("l~ Component : ", Component);
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//
//   return { pageProps };
// };

export default MyApp;
