import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import { AccountDetails } from './components';
import Colaboration from './components/Colaborations';
import AnimalList from './components/AnimalList';

const containerCss = {
  display: 'flex',
  width: '100%', 
  height: '100vh',
  justifyContent: 'center'
};

const isLanding = true;

const centerCss = {
  alignSelf: 'center'
};

const pageSize = 5;
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  nonSelectedPage: {
    padding: '5px'
  },
  selectedPage: {
    padding: '5px',
    borderRadius: '15px',
    border: 'solid lightblue'
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  typographyClass: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  container: containerCss,
  center: centerCss
}));


const Account = props => {
  const classes = useStyles();
  const {user, setUser} = props;

  if (user.email === '') {
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
          <AccountDetails setUser={setUser} user={user} />
          
          
        </Grid>
      </Grid>
      <Colaboration user={user} status_request='Disponible' isLanding={false} />
      <Colaboration user={user} status_request='Reservado' isLanding={false} />
      <AnimalList isLanding={false} role='requester' user={user} />
      <AnimalList isLanding={false} role='adopter' user={user} />
      
    </div>
  );
};

export default Account;
