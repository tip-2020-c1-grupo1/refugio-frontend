import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Link , Typography} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import cogoToast from 'cogo-toast';
import MDSpinner from 'react-md-spinner';
import axios from 'axios';

import { AnimalsToolbar, AnimalCard } from './components';
import { aquamarine } from 'color-name';

const containerCss = {
  display: 'flex',
  width: '100%', 
  height: '100vh',
  justifyContent: 'center'
};

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
    // color: 'red',
    // backgroundColor: 'blue',
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

const AnimalList = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [actualUrl, setActualUrl] = useState('');
  const [searchString, setSearchString] = useState('');
  // const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    // ASYNC , set true
    getInitialAnimals()
  }, []);

  const getInitialAnimals = () => {
    const baseUrl = 'http://localhost:8000/api/';
    const animalsUrl = baseUrl + 'animals?page=1';
    getAnimals(animalsUrl);
  }

  const getAnimals = (animalsUrl) => {
    let url = animalsUrl;
    if (searchString !== '') {
      url += '&name=' + searchString;
    }
    axios.get(url)
        .then(res => {
            setData(res.data);
            const count = res.data.count;
            let numberOfRequiredPages = Math.round(count / pageSize);
            if (count < pageSize) {
              setPages([1]);
              setSelectedPage(1);
            }
            else {
              if (numberOfRequiredPages === count/pageSize) {
                const numberOfArrays = [];
                for (var i=1; i <= numberOfRequiredPages; i++) {
                  numberOfArrays.push(i);
                } 
                setPages(numberOfArrays);
              } else {
                numberOfRequiredPages += 1;
                const numberOfArrays = [];
                for (var i=1; i <= numberOfRequiredPages; i++) {
                  numberOfArrays.push(i);
                } 
                setPages(numberOfArrays);
              }
              const pageArray = animalsUrl.split('?page=')
              if (pageArray.length == 1) {
                setSelectedPage(1);
              } else {
                const selectedPageElem = pageArray[1][0];
                setSelectedPage(selectedPageElem);
              }
            }
            
            setActualUrl(animalsUrl);
            setLoad(true);
            
        })
        .catch(err => {
            // CHECK ERRORS
            setData({results : []})
            setActualUrl(animalsUrl);
            cogoToast.error(err.message, {
              position: 'top-center'
            });
            setPages([]);
            console.log(err.message);
        })
  }

  const getPrevPage = () => {
    getAnimals(data.previous);
  };

  const getAnimalsFromPage = (page) => {
    const baseUrl = 'http://localhost:8000/api/';
    const animalsUrl = baseUrl + 'animals?page=' + page;
    getAnimals(animalsUrl);
  };

  const getNextPage = () => {
    getAnimals(data.next);
  };

  const applySearch = () => {
    getAnimals(actualUrl);
  }

  if (!load) {
    return (
      <div className={classes.container}>
        <div className={classes.center}>
          <MDSpinner size={88} />
        </div>
      </div>
      );
  }

  return (
    <div className={classes.root}>
      {<AnimalsToolbar
        setSearchString={setSearchString} 
        applySearch={applySearch} /> }
      <div className={classes.content}>
       { !data.results ? 
        <span> No hay mascotas que coincidan con tu busqueda </span> :
        <Grid
          container
          spacing={3}
        >
          {data.results.map(animal => (
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
       </Grid> }
      </div>
      <div className={classes.pagination}>

        <IconButton disabled={!data.previous} onClick={getPrevPage}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography className={classes.typographyClass}>
          {pages.map(page => (
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                getAnimalsFromPage(page)
              }}
            >
              <span className={page == selectedPage ? classes.selectedPage : classes.nonSelectedPage}>
                {page}
              </span>
            </Link>
          ))}    
        </Typography>        
        
        <IconButton disabled={!data.next} onClick={getNextPage}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AnimalList;
