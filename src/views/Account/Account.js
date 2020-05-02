import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import { AccountDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = props => {
  const classes = useStyles();
  if (props.user.email === '') {
    return <Redirect to='/' />
  }
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails setUser={props.setUser} user={props.user} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
