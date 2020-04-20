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
  const [actualUrl, setActualUrl] = useState(''); 
  const [error, setError] = useState('');
  const [searchString, setSearchString] = useState('');
  // const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    // ASYNC , set true
    getInitialAnimals()
  }, []);

  const getInitialAnimals = () => {
    const baseUrl = 'http://localhost:8000/api/';
    const animalsUrl = baseUrl + 'animals';
    getAnimals(animalsUrl);
  }

  const getAnimals = (animalsUrl) => {
    let url = animalsUrl;
    if (searchString !== '') {
      url += '?name=' + searchString;
    }
    console.log(url);
    axios.get(url)
        .then(res => {
            console.log(animalsUrl);
            setData(res.data);
            setActualUrl(animalsUrl);
            setLoad(true);
            console.log(res.data);
        })
        .catch(err => {
            setError(err.message);
            console.log(err.message);
            setLoad(true)
        })
  }

  const getPrevPage = () => {
    getAnimals(data.previous);
  };

  const getNextPage = () => {
    getAnimals(data.next);
  };

  const applySearch = () => {
    getAnimals(actualUrl);
  }

  return (
    <div className={classes.root}>
      {<AnimalsToolbar
        setSearchString={setSearchString} 
        applySearch={applySearch} /> }
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          
          {/*data.results.map(animal => (
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
        <IconButton disabled={!data.previous} onClick={getPrevPage}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton disabled={!data.next} onClick={getNextPage}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AnimalList;
