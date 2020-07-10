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
import './ColaborationModal.css';
import {filter, map} from 'lodash';
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
  const { className, open, reloadColabs, handleClose, colaboration, user, isLanding, ...rest } = props;
  const classes = useStyles();

  const colabs = map(colaboration.colaborators, 'email');

  const isAlreadyColab = filter(colabs, function (colabmail) {
    return  colabmail === user.email
  }).length === 1;

  const otherColabs = filter(colabs, function (colabmail) {
    return  colabmail !== user.email
  });

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
          <React.Fragment >
            <Divider />
            <Typography
            className='colaboration_card_description'
            align="center"
            variant="body1"
          >
            {colaboration.description}
          </Typography>
          </React.Fragment >

          {isAlreadyColab ? <React.Fragment >
            <Divider />
            <Typography
              align="center"
              variant="body1"
              className='colaboration_card_description'
            >
              Usted ya colaboró en esta petición.
            </Typography>
          </React.Fragment > : <React.Fragment />}

          <Divider />
          {otherColabs.map( (colab) => (
            <Typography
            align="center"
            variant="body1"
            className='colaboration_card_description'
          >
            {colab} también colaboró.
          </Typography>
          ))}
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
                {colaboration.gender} - {colaboration.race} - {colaboration.specie}
              </Typography>
              
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
              <ColaborationSubmit isLanding={isLanding} isAlreadyColab={isAlreadyColab} reloadColabs={reloadColabs} user={user} colaboration={colaboration}/>
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
