import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@material-ui/core';
import './AnimalPlanVacunatorioModal.css';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  root: {},
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

const AnimalPlanVacunatorioModal = props => {
  const { className, planVacunatorio, open, handleClose, ...rest } = props;
  const classes = useStyles();
  return (
    <Modal
      className={classes.modalStyle1}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card
        {...rest}
        style={{width: '700px', margin: 'auto'}}
        className={clsx(classes.root, className)}
      >
        <CardContent>
          {planVacunatorio && planVacunatorio.length > 0 ? preparePlanVacunatorio(planVacunatorio) : 
          <React.Fragment>
            <h4>No disponemos de información</h4>
          </React.Fragment>}
        </CardContent>
        <CardActions>
          <Button 
            variant='outlined'
            style={{margin: 'auto'}} 
            onClick={handleClose} > Cerrar</Button>
        </CardActions>
      </Card>
    </Modal>
    
  );
};

AnimalPlanVacunatorioModal.propTypes = {
  className: PropTypes.string,
  planVacunatorio: PropTypes.object.isRequired
};

export default AnimalPlanVacunatorioModal;

function preparePlanVacunatorio(planVacunatorio) {
  const RawHTML = ({children, className = ""}) => 
  <div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />
  return <RawHTML>{planVacunatorio}</RawHTML>;
}

