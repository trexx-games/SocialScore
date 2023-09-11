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

import '@apps/styles/globals.scss';
const MyApp = ({ Component, pageProps }: AppProps) => {
  // const { chains, publicClient, webSocketPublicClient } = configureChains(
  //   [mainnet],
  //   [publicProvider()]
  // );

  // const config = createConfig({
  //   autoConnect: true,
  //   publicClient,
  //   webSocketPublicClient,
  // });
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
          {/* <WagmiConfig config={config}></WagmiConfig> */}
          <TrexxContainer>
            <Component {...pageProps} />
          </TrexxContainer>
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
