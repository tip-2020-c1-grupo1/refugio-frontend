import React, { useState } from 'react';
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
    height: 50,
    width: 139,
    size: 'small',
    fontSize: '10px'
  }
}));

const AnimalCard = props => {
  const { className, animal, user, ...rest } = props;

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSeguimiento, setOpenSeguimiento] = useState(false);

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
      console.log(data);
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
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Button size="small" variant="contained" onClick={manageOpenSeguimiento}>Ver seguimiento</Button>

        <Button size="small" variant="contained" onClick={handleOpen}>Ver detalle</Button>
        <AnimalModal 
          handleClose={handleClose}
          animal={animal}
          open={open}
          user={user}
        />

        <AnimalSeguimientoModal 
          handleClose={handleCloseSeguimiento}
          data={data}
          open={openSeguimiento}
        />


        <div className={classes.imageContainer}>
          <img
            alt="Animal"
            className={classes.image}
            src={animal.images[0].image}
          />
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
              {animal.gender} - {animal.race} - {animal.species}
            </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.statsItem} item>
          <AdoptionSubmit user={user} animal={animal}/>
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
