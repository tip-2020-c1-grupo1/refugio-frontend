import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from "react-router-dom";
import { AccountDetails } from './components';
import Colaboration from './components/Colaborations';
import AnimalList from './components/AnimalList';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  
}))(MuiExpansionPanelDetails);



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
  const [expanded, setExpanded] = React.useState('panel1');

  const {user, setUser} = props;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (user.email === '') {
    return <Redirect to='/' />
  }
  return (
    <div className={classes.root}>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant='h2'>Información del usuario</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <AccountDetails setUser={setUser} user={user} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Colaboration user={user} status_request='Disponible' isLanding={false} />
      <Colaboration user={user} status_request='Reservado' isLanding={false} />
      <AnimalList isLanding={false} role='requester' user={user} />
      <AnimalList isLanding={false} role='adopter' user={user} />
      
    </div>
  );
};

export default Account;
