import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(200deg, #66E3A6 45.11%, #36A9E1 94.35%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            marginTop: 7,
            justifyContent: 'space-between',
            alignItems: 'center',
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

          <Button
            style={{
              borderRadius: 25,
              height: 35,
              background: 'white',
              color: '#36A9E1',
              marginRight: 30,
            }}
            variant={'contained'}
            size="small"
            onClick={() => router.push('/login')}
            title="Log In"
          >
            Log In
          </Button>
        </div>

        <Box
          display={'flex'}
          marginTop={10}
          flexDirection={'column'}
          justifyContent={'space-between'}
          height={'100%'}
          marginBottom={10}
        >
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography variant="body1" fontSize={22} color={'#4A4A4A'}>
              Building your{' '}
              <Box fontWeight={500} display={'inline'}>
                {'score. \n'}
              </Box>
            </Typography>
            <Typography variant="body1" fontSize={22} color={'#4A4A4A'}>
              Having a credit{' '}
              <Box fontWeight={500} display={'inline'}>
                {'access. \n'}
              </Box>
            </Typography>
            <Typography variant="body1" fontSize={22} color={'#4A4A4A'}>
              Explore new{' '}
              <Box fontWeight={500} display={'inline'}>
                {'opportunities. \n'}
              </Box>
            </Typography>
          </Box>

          <div
            style={{
              width: '100%',
              height: 200,
              position: 'relative',
            }}
          >
            <Image
              src={'./shared/LoadingPage.svg'}
              alt="loading_page"
              fill={true}
            />
          </div>

          <Typography color={'white'}>
            Start your journey to be a part of new world.
          </Typography>

          <Button
            variant="contained"
            style={{
              borderRadius: 25,
              height: 35,
              background: 'white',
              color: '#36A9E1',
              marginRight: 30,
              margin: 'auto',
            }}
          >
            <Typography>Create Your Account!</Typography>
          </Button>
        </Box>
      </div>
    </>
  );
};

export default LandingPage;
