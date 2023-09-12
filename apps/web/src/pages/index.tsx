import { APP_NAME } from '@apps/config';
import LandingPage from '@apps/screens/LandingPage';
import { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

const Page: NextPage = () => {
  const { t } = useTranslation('screen');

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${t('home.title')}`}</title>
      </Head>
      <LandingPage />
    </>
  );
};

// ======================= EXPORT
export default Page;
