import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import ImageGallery from 'react-image-gallery';
import {map} from 'lodash';
import './AnimalModal.css';
import cogoToast from 'cogo-toast';
import submitAdoptionRequest from '../AnimalAdoptionApi';
import AdoptionSubmit from '../AdoptionSubmit'


const useStyles = makeStyles(theme => ({
  modalStyle1:{
    position:'absolute',
    top:'10%',
    left:'10%',
    overflow:'scroll',
    height:'100%',
    display:'block'
  },
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
  const { className, open, handleClose, reload, animal, user, ...rest } = props;
  const classes = useStyles();
  const errorCallback = (err) => {
    cogoToast.error(err.response.data.Error, {
      position: 'top-center'
    })
  };

  const adoptionRequest = () => { 
    submitAdoptionRequest(animal.id, user.email).then(response => {
      reload();
      cogoToast.success(response.data.Ok, {
        position: 'top-center'
      });   
             
    })
    .catch(err => {        
      errorCallback(err);
    })   
  };

  const imagesShow = map(animal.images, function(elem) {
    return {
      original: elem.image,
      thumbnail: elem.image,
    }
  });

  const prepareLongDescription = (elem) => {
    const RawHTML = ({children, className = ""}) => 
    <div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />
    return <RawHTML>{elem}</RawHTML>;
  }

  return (
    <Modal
      open={open}
      className={classes.modalStyle1}
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
          <ImageGallery items={imagesShow} />

          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {animal.name}
          </Typography>

          {animal.long_description ? prepareLongDescription(animal.long_description) : <Typography
            align="center"
            variant="h4"
          >
            {animal.description}
          </Typography> }

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
              <AdoptionSubmit reload={reload} user={user} animal={animal}/>
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
