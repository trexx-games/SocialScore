import { PropsWithChildren } from 'react';

export const TrexxContainer: React.FC<PropsWithChildren> = (props) => {
  return <div className="max-w-[500px] mx-auto">{props.children}</div>;
};

export default TrexxContainer;
