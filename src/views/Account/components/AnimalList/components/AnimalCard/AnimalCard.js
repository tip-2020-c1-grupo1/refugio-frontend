import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Divider
} from '@material-ui/core';
import AnimalModal from './AnimalModal';
import AnimalSeguimientoModal from './AnimalSeguimientoModal';
import AdoptionSubmit from './AdoptionSubmit';

import cogoToast from 'cogo-toast';
import getAnimalTimelineApi from './AnimalTimelineApi';
import ReactIntense from 'react-intense';

// <RouterLink {...props} />

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 200,
    width: 200,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  button: {
    size: 'large',
    marginLeft: 13
  }
}));

const AnimalCard = props => {
  const { className, isLanding, reload, animal, user, ...rest } = props;

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSeguimiento, setOpenSeguimiento] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', userEvent => {
      // const parentClass = userEvent.path[0].parentNode.className
      // if (parentClass === 'ri-container') document.body.style.overflow = null
      document.body.style.overflow = null

    })
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const errorCallback = (err) => {
    cogoToast.error(err.response.data.Error, {
      position: 'top-center'
    })
  };

  const manageOpenSeguimiento = () => {
    getAnimalTimelineApi(animal.id).then(response => {
      const data = response.data;
      setData(data);
      setOpenSeguimiento(true);    
    })
    .catch(err => {   
      setData([]);     
      errorCallback(err);
    });
    
  };

  const handleCloseSeguimiento = () => {
    setOpenSeguimiento(false);
  };

  
  return (
    <Card
      {...rest}
      style={{width : '100%'}}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        {
          isLanding ? <React.Fragment />
          : <React.Fragment>
            <Button className={classes.button} size="small" variant="contained" onClick={manageOpenSeguimiento}>Ver seguimiento</Button>
            <Button className={classes.button} size="small" variant="contained" onClick={handleOpen}>Ver detalle</Button>

           
            <AnimalModal 
              handleClose={handleClose}
              reload={reload}
              animal={animal}
              open={open}
              user={user}
            />

            <AnimalSeguimientoModal 
              handleClose={handleCloseSeguimiento}
              data={data}
              open={openSeguimiento}
            />
          </React.Fragment>
        }
        

        <div className={classes.imageContainer}>
          <ReactIntense src={animal.images[0].image} />
        </div>
        
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {animal.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {animal.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              {animal.gender} - {animal.race} - {animal.specie} | ESTADO : {animal.status_request}
            </Typography>

          </Grid>
        </Grid>

        <Grid className={classes.statsItem} item>
          <AdoptionSubmit reload={reload} user={user} animal={animal}/> 
        </Grid>     
      </CardActions>
    </Card>
  );
};

AnimalCard.propTypes = {
  className: PropTypes.string,
  animal: PropTypes.object.isRequired
};

export default AnimalCard;
