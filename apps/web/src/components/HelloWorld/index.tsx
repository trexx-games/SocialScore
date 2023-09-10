import React from 'react';

export interface HelloWorldProps {
  title?: string;
}

export const HelloWorld: React.FC<HelloWorldProps> = (props) => {
  return <div>{props.title ?? 'Welcome to Hello World!'}</div>;
};

export default HelloWorld;
