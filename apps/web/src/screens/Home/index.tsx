import {
  OutlinedInput,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { connectToSmartWallet } from '@apps/utils/wallets';
import { useState } from 'react';
import { Signer } from 'ethers';
import { useConnectMutation } from '@stack/data-access';
import { redirect, setAuthToken, setCookie } from '@webbyx/next-js';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation('common');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signer, setSigner] = useState<Signer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [connect] = useConnectMutation({
    onCompleted: async (data) => {
      const result = data.connect;
      // set to cookie & redirect to dashboard
      setAuthToken(result.accessToken);
      setCookie('refreshToken', result.refreshToken);
      redirect({}, '/main', 'replace');
      // router.push('/main', { query: { slug: await signer?.getAddress() } });
    },
  });

  const connectWallet = async () => {
    if (!username || !password) return;
    try {
      setIsLoading(true);
      const wallet = await connectToSmartWallet(username, password, (status) =>
        setLoadingStatus(status)
      );
      const s = await wallet.getSigner();
      const address = await s.getAddress();
      setSigner(s);
      setIsLoading(false);
      console.log('signer', address);
      connect({
        variables: {
          input: {
            address: address,
            message: 'hello',
            signature: 'hello',
            username: 'user',
          },
        },
      });
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setError((e as any).message);
    }
  };

  // ======================= VIEWS

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(200deg, #66E3A6 45.11%, #36A9E1 94.35%)',
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          marginTop: 7,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: 60,
            width: 100,
            marginLeft: 20,
          }}
        >
          <Image fill={true} src={'./shared/Trexx.svg'} alt={'trexx svg'} />
        </div>
      </div>
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          style={{
            color: '#4A4A4A',
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
          }}
        >
          {' '}
          Sign In to Trexx{' '}
        </Typography>
        <OutlinedInput
          style={{
            borderRadius: 25,
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
            marginBottom: 10,
            background: 'white',
            color: '#7B7D7E',
          }}
          size="small"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <OutlinedInput
          style={{
            borderRadius: 25,
            marginLeft: 25,
            marginRight: 25,
            marginBottom: 10,
            background: 'white',
            color: '#7B7D7E',
          }}
          size="small"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            style={{
              background: '#FFDF35',
              color: '#7B7D7E;',
              borderRadius: 25,
              marginRight: 25,
              marginLeft: 25,
            }}
            variant={'contained'}
            onClick={() => connectWallet()}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

// ======================= EXPORT
export default HomeScreen;
