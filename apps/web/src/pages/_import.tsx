import { PropsWithChildren } from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
const ThirdWeb: React.FC<PropsWithChildren> = (props) => {
  return (
    <ThirdwebProvider
      activeChain={'mumbai'}
      clientId="2a975eb811c931d98fc264ac5ae278f5"
    >
      {props.children}
    </ThirdwebProvider>
  );
};

export default ThirdWeb;
