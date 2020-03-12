import React from 'react';
import { Grid } from '@material-ui/core';

export type TypeControllerProps = { icon: string; type: string };

const TypeController: React.FC<TypeControllerProps> = (
  props: TypeControllerProps
) => {
  return (
    <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
      {props.type}
    </Grid>
  );
};

export default TypeController;
