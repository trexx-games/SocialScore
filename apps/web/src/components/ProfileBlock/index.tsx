import { sliceWalletAddress } from '@apps/utils/crypto';
import { Box, Typography } from '@mui/material';

import { ProfileBlockProps } from './props';

export const ProfileBlock: React.FC<ProfileBlockProps> = (props) => {
  const { profileGuide, walletAddress } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        style={{
          color: '#0E1566',
          fontWeight: 600,
          fontSize: 19,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {`@${sliceWalletAddress(walletAddress)}`}
      </Typography>

      <Box
        sx={{
          background: 'linear-gradient(218deg, #66E3A6 10.93%, #36A9E1 92.73%)',
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
        {`${profileGuide}`}
      </Typography>
    </div>
  );
};

export default ProfileBlock;
