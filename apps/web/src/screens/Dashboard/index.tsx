import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { NavBar, ProfileBlock } from '@apps/components';
import { sliceWalletAddress } from '@apps/utils/crypto';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import {
  useLinkWalletMutation,
  useListLinkedWalletLazyQuery,
} from '@stack/data-access';
import { useAuthIdentity } from '@webbyx/next-js';
import Link from 'next/link';
import { useAccount, useConnect } from 'wagmi';
import { useSignMessage } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { DashboardProps } from './props';

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { address, isConnected } = useAccount();
  const { authUser } = useAuthIdentity();
  const [getLinkedWallets, { refetch, data: linkedWallets }] =
    useListLinkedWalletLazyQuery();
  const [linkWallet] = useLinkWalletMutation({
    onCompleted: (data) => {
      console.log('data', data);
      refetch();
    },
    onError: (e) => {
      toast.error(e.message, {
        autoClose: 3000,
        position: 'top-right',
      });
    },
  });
  const connector = new MetaMaskConnector({
    chains: [polygonMumbai],
    options: {
      shimDisconnect: false,
    },
  });
  const { connectAsync } = useConnect({ connector });
  const { signMessageAsync } = useSignMessage({
    message: 'hello world',
  });

  const handleConnect = async () => {
    try {
      if (!isConnected && !address) {
        const result = await connectAsync();

        console.log('address', result.account);
        return;
      }

      const data = await signMessageAsync();

      linkWallet({
        variables: {
          input: {
            address: address ?? '',
            signature: data,
            message: 'hello world',
          },
        },
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    try {
      getLinkedWallets();
    } catch (error: any) {
      console.log(error?.message);
    }
  }, []);

  // ==================== VIEWS
  return (
    <div>
      {/* NAV BAR */}
      <NavBar />

      <ProfileBlock
        walletAddress={authUser?.address.toString()}
        profileGuide={`Let's begin, first link your wallet.`}
      />

      <Card
        sx={{
          background: '#F5F6FB',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Button
            sx={{
              background: 'white',
              color: '#FFB84F',
              paddingX: 4,
              paddingY: 2,
              borderRadius: 3,
              boxShadow: '0px 25px 45px 5px rgba(2, 24, 103, 0.08)',
            }}
            onClick={async () => handleConnect()}
          >
            {!isConnected ? 'Connect wallet' : '+ Link my current wallet'}
          </Button>
        </CardContent>
      </Card>

      {linkedWallets?.listLinkedWallet?.map((wallet, i) => {
        return (
          <Link
            key={i}
            href={`/wallet/${wallet.address}`}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                mb: 2,
                bgcolor: '#F5F6FB',
                color: '#54C1FB',
                py: 2,
                px: 4,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <Typography>
                {sliceWalletAddress(wallet.address, 12, -12)}
              </Typography>
            </Box>
          </Link>
        );
      })}
    </div>
  );
};

export default Dashboard;
