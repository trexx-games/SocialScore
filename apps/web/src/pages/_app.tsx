import {
  withApolloClient,
  withAuthIdentity,
  withRouteIndicator,
} from '@webbyx/next-js';
import Head from 'next/head';
import { AppProps } from 'next/app';
import compose from 'lodash/flowRight';
import { ThemeProvider } from '@mui/material';
import { muiTheme } from '@apps/config/material.config';
import { primaryColor } from '@apps/config/colors';
import { APP_NAME, apolloOptions, authOptions } from '@apps/config';
import '@apps/styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>{APP_NAME}</title>
      </Head>
      <ThemeProvider theme={muiTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

// ======================= EXPORTS
export default compose(
  withApolloClient({ ssr: true, options: apolloOptions }),
  withAuthIdentity({ ssr: true, apollo: true, options: authOptions }),
  withRouteIndicator({ color: primaryColor })
)(MyApp);
