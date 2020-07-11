import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import cogoToast from 'cogo-toast';
import MDSpinner from 'react-md-spinner';
import {getInitialsAnimals} from './LandingApi';
import { AnimalsGrid } from 'views/AnimalListContainer/AnimalList/components';
import { Grid, Typography } from '@material-ui/core';
import Colaboration from 'views/Colaboration';
import ComplaintList from './ComplaintList';

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

const Landing = props => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  
  const [selectedPage, setSelectedPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [selectedStateFilter, setSelectedStateFilter] = useState([{ label: 'Disponible', value: 'Disponible' }]);

  const [selectedFilters, setSelectedFilters] = useState([{ label: "Nombre", value: "name" }]);
  const [searchString, setSearchString] = useState('');
  
  const {user} = props

  useEffect(() => {
    searchAnimals();
  }, []);

  const errorCallback = (err) => {
    cogoToast.error(err.message, {
      position: 'top-center'
    });
    setData({ results: [] });
    setPages([]);
    console.log(err.message);
  }

  const saveInformationInState = (res) => {
    setData({results : res.data});
    const count = res.data.count;
    let numberOfRequiredPages = Math.round(count / pageSize);
    if (count < pageSize) {
      setPages([1]);
      setSelectedPage(1);
    }
    else {
      if (numberOfRequiredPages === count / pageSize) {
        const numberOfArrays = [];
        for (var i = 1; i <= numberOfRequiredPages; i++) {
          numberOfArrays.push(i);
        }
        setPages(numberOfArrays);
      }
      else {
        numberOfRequiredPages += 1;
        const numberOfArrays = [];
        for (var i = 1; i <= numberOfRequiredPages; i++) {
          numberOfArrays.push(i);
        }
        setPages(numberOfArrays);
      }
      let selectedPageElem = 0;
      const isFirstPage = !res.data.previous;
      if (isFirstPage) {
        setSelectedPage(1);
      } else {
        const pageArray = res.data.previous.split('?page=');
        const isSecondPage = pageArray.length === 1;
        if (isSecondPage) {
          selectedPageElem = 2;
        } else {
          selectedPageElem = pageArray[1][0] + 1;
        }
        setSelectedPage(selectedPageElem);
      }      
    }
    setLoad(true); 
  }

  

  const searchAnimals = () => {
    console.log('BUSCANDO ANIMALES !!!')
    getInitialsAnimals(searchString, selectedFilters, selectedStateFilter)
      .then(res => {
        saveInformationInState(res);           
      })
      .catch(err => {        
        errorCallback(err);
      })    
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
      <Grid container spacing={3}>
        <Grid item key={'animalsgrid'} lg={12} md={12} sm={12}>
          <Typography variant='h2'>Animales del refugio</Typography>
          <AnimalsGrid reload={searchAnimals} isLanding={isLanding} classes={classes} data={data} user={user} />
        </Grid>

        <Grid item key={'colaboration-grid'} lg={12} md={12} sm={12}>
          <Colaboration isLanding={isLanding} classes={classes} user={user} />
        </Grid>

        <Grid item key={'complaints-grid'} lg={12} md={12} sm={12}>
          <ComplaintList classes={classes} user={user} />
        </Grid>
      </Grid>
      
    </div>
  );
};

export default Landing;
