import React from 'react';
import { Grid, makeStyles, Checkbox, Icon } from '@material-ui/core';

export type TypeControllerProps = { icon: string; type: string };

const useStyles = makeStyles({
  containerIndLayer: {}
});

const TypeController: React.FC<TypeControllerProps> = (
  props: TypeControllerProps
) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.containerIndLayer}
      container
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      direction="row"
      // justify="center"
      alignItems="center"
    >
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
        <Icon>{props.icon}</Icon>
      </Grid>

      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        {props.type}
      </Grid>

      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
        <Checkbox
          value="checkedA"
          inputProps={{ 'aria-label': 'Checkbox A' }}
        />
      </Grid>
    </Grid>
  );
};

export default TypeController;
