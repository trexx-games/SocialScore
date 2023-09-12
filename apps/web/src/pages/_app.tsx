import { ToastContainer } from 'react-toastify';
import { TrexxContainer } from '@apps/components';
import { apolloOptions, APP_NAME, authOptions } from '@apps/config';
import { primaryColor } from '@apps/config/colors';
import { muiTheme } from '@apps/config/material.config';
import { ThemeProvider } from '@mui/material';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import {
  withApolloClient,
  withAuthIdentity,
  withRouteIndicator,
} from '@webbyx/next-js';
import compose from 'lodash/flowRight';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import '@apps/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [publicProvider()]
  );

  const config = createConfig({
    autoConnect: false,
    publicClient,
    webSocketPublicClient,
  });
  return (
    <>
      <ThirdwebProvider
        clientId="2a975eb811c931d98fc264ac5ae278f5"
        activeChain={'mumbai'}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 maximum-scale=1"
          />
          <title>{APP_NAME}</title>
        </Head>
        <ThemeProvider theme={muiTheme}>
          <WagmiConfig config={config}>
            <TrexxContainer>
              <Component {...pageProps} />
              <ToastContainer />
            </TrexxContainer>
          </WagmiConfig>
        </ThemeProvider>
      </ThirdwebProvider>
    </>
  );
};

// ======================= EXPORTS
export default compose(
  withApolloClient({ ssr: true, options: apolloOptions }),
  withAuthIdentity({ ssr: true, apollo: true, options: authOptions }),
  withRouteIndicator({ color: primaryColor })
)(MyApp);
