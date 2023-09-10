import Head from 'next/head';
import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { APP_NAME } from '@apps/config';
import HomeScreen from '@apps/screens/Home';

const Page: NextPage = () => {
  const { t } = useTranslation('screen');

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${t('home.title')}`}</title>
      </Head>
      <HomeScreen />
    </>
  );
};

// ======================= EXPORT
export default Page;
