import { APP_NAME } from '@apps/config';
import Dashboard from '@apps/screens/Dashboard';
import { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

const Main: NextPage = () => {
  const { t } = useTranslation('screen');
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${t('home.title')}`}</title>
      </Head>
      <Dashboard />
    </>
  );
};

// ======================= EXPORT
export default Main;
