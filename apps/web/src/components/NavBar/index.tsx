import { Box } from '@mui/material';
import Image from 'next/image';

export const NavBar: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div style={{ position: 'relative', height: 60, width: 100 }}>
        <Image fill={true} src={'/TrexxIcon.svg'} alt={'trexx svg'} />
      </div>
      <Box
        sx={{
          background: 'linear-gradient(218deg, #66E3A6 10.93%, #36A9E1 92.73%)',
          height: 40,
          width: 40,
          borderRadius: 60,
          marginRight: 2,
        }}
      />
    </div>
  );
};

export default NavBar;
