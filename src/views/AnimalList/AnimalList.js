import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from 'axios';

import { AnimalsToolbar, AnimalCard } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const AnimalList = () => {
  const classes = useStyles();

  const [animals] = useState(mockData);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  // const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const baseUrl = 'http://localhost:8000/api/';
    axios.get(baseUrl + 'animals')
        .then(res => {
            console.log(res.data);
            setData(res.data);
            setLoad(true);
            console.log(data);
        })
        .catch(err => {
            setError(err.message);
            console.log(err.message);
            setLoad(true)
        })
  }, []);

  return (
    <div className={classes.root}>
      {/* <AnimalsToolbar /> */}
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          
          {/*data.map(animal => (
            <Grid
              item
              key={animal.id}
              lg={4}
              md={6}
              xs={12}
            >
              <span>{animal.name}</span>
            </Grid>
          )) */}
          {animals.map(animal => (
            <Grid
              item
              key={animal.id}
              lg={4}
              md={6}
              xs={12}
            >
              <AnimalCard animal={animal} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AnimalList;
