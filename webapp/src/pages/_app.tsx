import { ThemeProvider } from "@mui/material";
import theme from "@/theme";

import NextApp from "next/app";
import { IntlProvider } from "next-intl";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, messages, pageProps }: any) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProvider
          locale="en"
          timeZone="Asia/Dubai"
          messages={{ ...messages, ...pageProps.messages }}
        >
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
          <ToastContainer
          position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
        </IntlProvider>
      </PersistGate>
    </Provider>
  );
}

App.getInitialProps = async function getInitialProps(appContext: any) {
  const { locale } = appContext.router;

  const messages = await import(`@/localization/${locale}.json`);
  return {
    ...(await NextApp.getInitialProps(appContext)),
    messages,
  };
};

export default App;
