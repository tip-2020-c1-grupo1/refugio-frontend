import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import './AnimalSeguimientoModal.css';

import WorkIcon from '@material-ui/icons/Work';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';



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

const AnimalSeguimientoModal = props => {
  const { className, data, open, handleClose, ...rest } = props;
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
          {data && data.length > 0 ? prepareTimeline(data) : 
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

AnimalSeguimientoModal.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default AnimalSeguimientoModal;

function prepareTimeline(data) {
  if (data) {
    console.log(data);
  }  
  return <VerticalTimeline>
    {
      data.map(event => (
        <VerticalTimelineElement 
          key={event.id}
          className="vertical-timeline-element--work"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} 
          icon={<WorkIcon />}>
          <h3 className="vertical-timeline-element-title">{event.title}</h3>
          <h4 className="vertical-timeline-element-subtitle">{event.date_modified.split('T')[0]}</h4>
          <p>
            {event.description}
          </p>
        </VerticalTimelineElement>
      ))
    }
  </VerticalTimeline>;
}

