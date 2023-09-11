import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export const TrexxContainer: React.FC<PropsWithChildren> = (props) => {
  return <Box sx={{ padding: '16px' }}>{props.children}</Box>;
};

export default TrexxContainer;
