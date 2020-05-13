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
        style={{width: '600px', margin: 'auto'}}
        className={clsx(classes.root, className)}
      >
        <CardContent>
          {prepareTimeline(data)}
        </CardContent>
        <CardActions>
          <Button onClick={handleClose} > Cerrar</Button>
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
    <VerticalTimelineElement className="vertical-timeline-element--work" contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }} date="2011 - present" iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} icon={<WorkIcon />}>
      <h3 className="vertical-timeline-element-title">Creative Director</h3>
      <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
      <p>
        Creative Direction, User Experience, Visual Design, Project Management, Team Leading
      </p>
    </VerticalTimelineElement>
    <VerticalTimelineElement className="vertical-timeline-element--work" date="2010 - 2011" iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} icon={<WorkIcon />}>
      <h3 className="vertical-timeline-element-title">Art Director</h3>
      <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
      <p>
        Creative Direction, User Experience, Visual Design, SEO, Online Marketing
      </p>
    </VerticalTimelineElement>
    <VerticalTimelineElement className="vertical-timeline-element--work" date="2008 - 2010" iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} icon={<WorkIcon />}>
      <h3 className="vertical-timeline-element-title">Web Designer</h3>
      <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
      <p>
        User Experience, Visual Design
      </p>
    </VerticalTimelineElement>
    <VerticalTimelineElement className="vertical-timeline-element--work" date="2006 - 2008" iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} icon={<WorkIcon />}>
      <h3 className="vertical-timeline-element-title">Web Designer</h3>
      <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
      <p>
        User Experience, Visual Design
      </p>
    </VerticalTimelineElement>
    <VerticalTimelineElement className="vertical-timeline-element--education" date="April 2013" iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }} icon={<WorkIcon />}>
      <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
      <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
      <p>
        Strategy, Social Media
      </p>
    </VerticalTimelineElement>
    <VerticalTimelineElement className="vertical-timeline-element--education" date="November 2012" iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }} icon={<WorkIcon />}>
      <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
      <h4 className="vertical-timeline-element-subtitle">Certification</h4>
      <p>
        Creative Direction, User Experience, Visual Design
      </p>
    </VerticalTimelineElement>
    <VerticalTimelineElement className="vertical-timeline-element--education" date="2002 - 2006" iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }} icon={<WorkIcon />}>
      <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
      <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
      <p>
        Creative Direction, Visual Design
      </p>
    </VerticalTimelineElement>
  </VerticalTimeline>;
}

