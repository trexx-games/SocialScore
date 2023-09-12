import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import { AchievementBlockProps } from './props';

export const AchivementBlock: React.FC<AchievementBlockProps> = (props) => {
  const { titles, badges, showMore } = props;

  return (
    <>
      {!showMore ? (
        <Grid container columns={2}>
          {titles.map((title, index) => {
            return (
              <Grid item xs={1} key={index}>
                <Box>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <Image
                      src={`/achievement${index + 1}.svg`}
                      width={45}
                      height={45}
                      alt={'achievement'}
                    />
                    <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                      {`${title}`}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 14,
                      mx: 'auto',
                      width: 100,
                    }}
                  >
                    {`${[badges[index].total]} badges`}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {titles.map((title, index) => {
            return (
              <Box key={index}>
                <div style={{ gap: 8, display: 'flex' }}>
                  <Image
                    src={`/achievement${index + 1}.svg`}
                    width={25}
                    height={25}
                    alt={'achievement'}
                  />
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, textAlign: 'left' }}
                  >
                    {`${title}`}
                  </Typography>
                </div>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    width: 100,
                    my: 1,
                    ml: 2,
                  }}
                >
                  {`${[badges[index].total]} badges`}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'no-wrap',
                    mb: 2,
                    gap: 2,
                    justifyContent: 'center',
                  }}
                >
                  {badges[index].total > 0 &&
                    [...new Array(badges[index].total)].map((_, i) => {
                      return (
                        <Box key={i} sx={{ width: 125 }}>
                          <Image
                            src={`/achievement${index + 1}.svg`}
                            width={45}
                            height={45}
                            alt="achievements"
                          />
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: 15,
                              color: '#0E1566',
                            }}
                          >
                            {`${badges[index].achivements?.[i]?.title}`}
                          </Typography>
                          <Typography
                            variant={'caption'}
                            sx={{ color: '#898CAA' }}
                          >
                            {`${badges[index].achivements?.[i]?.description}`}
                          </Typography>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AchivementBlock;
