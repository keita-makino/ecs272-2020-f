import React from 'react';
import TypeController, { TypeControllerProps } from '../atoms/TypeController';
import { Typography } from '@material-ui/core';

export type TypeControllerPanelProps = {
  title: string;
  typeArray: TypeControllerProps[];
};

const TypeControllerPanel: React.FC<TypeControllerPanelProps> = (
  props: TypeControllerPanelProps
) => {
  return (
    <>
      <Typography>{props.title}</Typography>
      {props.typeArray.map(item => (
        <TypeController type={item.type}></TypeController>
      ))}
    </>
  );
};

export default TypeControllerPanel;
