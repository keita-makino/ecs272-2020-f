import React from 'react';
import TypeController, { TypeControllerProps } from '../atoms/TypeController';

export type TypeControllerPanelProps = { typeArray: TypeControllerProps[] };

const TypeControllerPanel: React.FC<TypeControllerPanelProps> = (
  props: TypeControllerPanelProps
) => {
  return (
    <>
      {props.typeArray.map(item => (
        <TypeController type={item.type}></TypeController>
      ))}
    </>
  );
};

export default TypeControllerPanel;
