import { useState } from 'react';
import { NavBar, ProfileBlock } from '@apps/components';
import AchivementBlock from '@apps/components/AchievementBlock';
import LightCard from '@apps/components/LightCard';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const WalletScreen: React.FC = () => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const slug = router.query.slug as string;
  return (
    <>
      <NavBar />
      <ProfileBlock
        walletAddress={slug}
        profileGuide="Your actual social score"
      />

      <LightCard>
        <CardContent>
          <Grid container columns={2}>
            <Grid item xs={1}>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: 2,
                }}
              >
                <Typography>This month</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                  <Typography sx={{ fontWeight: 600 }}>1,141</Typography>
                  <Typography variant="caption">+ 7.4%</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: 2,
                }}
              >
                <Typography>This month</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                  <Typography sx={{ fontWeight: 600 }}>1,141</Typography>
                  <Typography variant="caption">+ 7.4%</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              ml: 2,
              mt: 2,
              gap: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                color: '#52AA43',
                border: 3,
                borderRadius: 60,
                width: 10,
                height: 10,
              }}
            />
            <Typography sx={{ color: '#898CAA' }}>Actual score</Typography>
          </Box>
        </CardContent>
      </LightCard>

      <LightCard sx={{ mt: 2 }}>
        <CardContent>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography sx={{ fontWeight: 600, fontSize: 18, mb: 2 }}>
              {' '}
              Achievements
            </Typography>
            <Typography
              sx={{ textDecoration: 'underline' }}
              onClick={() => setShowMore(!showMore)}
            >
              Show More
            </Typography>
          </Box>

          <AchivementBlock
            titles={['DAO', 'Transactions', 'DEFI', 'Development']}
            badges={[
              {
                total: 3,
                achivements: [
                  {
                    title: 'Nouns Voter',
                    description: '101 votes in NOUNS projects',
                  },
                  {
                    title: 'Nouns Builder',
                    description: '3 projects approved in NOUNS',
                  },
                  {
                    title: 'Nouns Partner',
                    description: '50 submitted proposals in NOUNS',
                  },
                ],
              },
              {
                total: 3,
                achivements: [
                  {
                    title: 'Treasury',
                    description: 'Holding > 10 units of different tokens',
                  },
                  {
                    title: 'Pure Trader',
                    description: '1389 total token transfers made',
                  },
                  {
                    title: 'ERC20 Hoarder',
                    description: '12 unique tokens purchased',
                  },
                ],
              },
              {
                total: 3,
                achivements: [
                  {
                    title: 'Uniswapper',
                    description: '78 swaps done in Uniswap',
                  },
                  {
                    title: 'Finance Officer',
                    description: 'made 22 loans',
                  },
                  {
                    title: 'Trusty Borrower',
                    description: '21 completed repayments',
                  },
                ],
              },
              {
                total: 0,
              },
            ]}
            showMore={showMore}
          />
        </CardContent>
      </LightCard>
    </>
  );
};

export default WalletScreen;
