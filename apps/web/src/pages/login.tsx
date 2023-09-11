import { NextPage } from 'next';
import Head from 'next/head';
import { APP_NAME } from '@apps/config';
import HomeScreen from '@apps/screens/Home';
import useTranslation from 'next-translate/useTranslation';

const Login: NextPage = () => {
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
export default Login;
