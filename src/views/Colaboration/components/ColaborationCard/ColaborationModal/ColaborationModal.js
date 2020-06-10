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
  Divider,
  Button
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import './ColaborationModal.css';
import cogoToast from 'cogo-toast';
import submitAdoptionRequest from '../ColaborationAdoptionApi';
import ColaborationSubmit from '../ColaborationSubmit'

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

const ColaborationModal = props => {
  const { className, open, reloadColabs, handleClose, colaboration, user, ...rest } = props;
  const classes = useStyles();

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
          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {colaboration.name}
          </Typography>
          <Typography
            align="center"
            variant="body1"
          >
            {colaboration.description}
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
                {colaboration.gender} - {colaboration.race} - {colaboration.species}
              </Typography>
              
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
              <ColaborationSubmit reloadColabs={reloadColabs} user={user} colaboration={colaboration}/>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Modal>
    
  );
};

ColaborationModal.propTypes = {
  className: PropTypes.string,
  colaboration: PropTypes.object.isRequired
};

export default ColaborationModal;
