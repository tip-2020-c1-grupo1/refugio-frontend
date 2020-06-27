import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './AnimalModal.css';
import cogoToast from 'cogo-toast';
import submitAdoptionRequest from '../AnimalAdoptionApi';
import AdoptionSubmit from '../AdoptionSubmit'
import ReactIntense from 'react-intense';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 500,
    width: 500,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: 400
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const AnimalModal = props => {
  const { className, open, handleClose, animal, user, ...rest } = props;
  const classes = useStyles();

  useEffect(() => {
    document.addEventListener('mousedown', userEvent => {
      // const parentClass = userEvent.path[0].parentNode.className
      // if (parentClass === 'ri-container') document.body.style.overflow = null
      document.body.style.overflow = null

    })
  }, []);

  const errorCallback = (err) => {
    cogoToast.error(err.response.data.Error, {
      position: 'top-center'
    })
  };

  const adoptionRequest = () => { 
    submitAdoptionRequest(animal.id, user.email).then(response => {
      cogoToast.success(response.data.Ok, {
        position: 'top-center'
      });           
    })
    .catch(err => {        
      errorCallback(err);
    })   
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card
        {...rest}
        style={{width: '600px', margin: 'auto'}}
        className={clsx(classes.root, className)}
      >
        <CardContent>
          <div className={classes.imageContainer}>
            <Carousel>
              {animal.images.map(image => (
                <div>
                  <ReactIntense src={image.image} />
                </div>                
              ))}
            </Carousel>

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
                {animal.gender} - {animal.race} - {animal.specie}
              </Typography>
              
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
              <AdoptionSubmit user={user} animal={animal}/>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Modal>
    
  );
};

AnimalModal.propTypes = {
  className: PropTypes.string,
  animal: PropTypes.object.isRequired
};

export default AnimalModal;
