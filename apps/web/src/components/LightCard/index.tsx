import { PropsWithChildren } from 'react';
import { Card } from '@mui/material';

import { LightCardProps } from './props';

export const LightCard: React.FC<PropsWithChildren<LightCardProps>> = (
  props
) => {
  const { sx, children } = props;
  return (
    <Card sx={{ background: '#F5F6FB', borderRadius: 3, ...sx }}>
      {children}
    </Card>
  );
};

export default LightCard;
