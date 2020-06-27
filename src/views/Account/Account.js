import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import { AccountDetails } from './components';
import Colaboration from './components/Colaborations';
import AnimalList from './components/AnimalList';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment>
          {children}
        </React.Fragment>
      )}
    </div>
  );
}
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
  const [value, setValue] = React.useState('one');

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {user, setUser} = props;

  if (user.email === '') {
    return <Redirect to='/' />
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab
            value="one"
            label="Información Personal"
            wrapped
            {...a11yProps('one')}
          />
          <Tab value="two" label="Colaboraciones" {...a11yProps('two')} />
          <Tab value="three" label="Adopciones" {...a11yProps('three')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <AccountDetails setUser={setUser} user={user} />
      </TabPanel>
      <TabPanel value={value} index="two">
        <Colaboration user={user} status_request='Disponible' isLanding={false} />
        <Colaboration user={user} status_request='Confirmado' isLanding={false} />
      </TabPanel>
      <TabPanel value={value} index="three">
        <AnimalList isLanding={false} role='requester' user={user} />
        <AnimalList isLanding={false} role='adopter' user={user} />
      </TabPanel>
    </div>
  );
};

export default Account;
