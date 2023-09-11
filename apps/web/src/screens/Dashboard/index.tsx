import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { TrexxContainer } from '@apps/components';
import { DashboardProps } from './props';

const Dashboard: React.FC<DashboardProps> = () => {
  // ==================== VIEWS
  return (
    <TrexxContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* NAV BAR */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ position: 'relative', height: 60, width: 100 }}>
            <Image
              fill={true}
              src={'./shared/TrexxIcon.svg'}
              alt={'trexx svg'}
            />
          </div>
          <Box
            sx={{
              background:
                'linear-gradient(218deg, #66E3A6 10.93%, #36A9E1 92.73%)',
              height: 40,
              width: 40,
              borderRadius: 60,
              marginRight: 2,
            }}
          />
        </div>

        <Typography
          style={{
            color: '#0E1566',
            fontWeight: 600,
            fontSize: 19,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          @username
        </Typography>

        <Box
          sx={{
            background:
              'linear-gradient(218deg, #66E3A6 10.93%, #36A9E1 92.73%)',
            height: 80,
            width: 80,
            borderRadius: 60,
          }}
        />

        <Typography
          sx={{
            color: '#54C1FB',
            fontWeight: 600,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          {`Let's begin, first link your wallet.`}
        </Typography>

        <Card
          sx={{
            background: '#F5F6FB',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent>
            <Button
              sx={{
                background: 'white',
                color: '#FFB84F',
                paddingX: 4,
                paddingY: 2,
                borderRadius: 5,
                boxShadow: '0px 25px 45px 5px rgba(2, 24, 103, 0.08)',
              }}
            >
              + Link Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    </TrexxContainer>
  );
};

export default Dashboard;
