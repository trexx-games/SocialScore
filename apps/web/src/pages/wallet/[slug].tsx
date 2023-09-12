import { APP_NAME } from '@apps/config';
import WalletScreen from '@apps/screens/Wallet';
import { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

const Wallet: NextPage = () => {
  const { t } = useTranslation('screen');
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${t('home.title')}`}</title>
      </Head>
      <WalletScreen />
    </>
  );
};

// ======================= EXPORT
export default Wallet;
