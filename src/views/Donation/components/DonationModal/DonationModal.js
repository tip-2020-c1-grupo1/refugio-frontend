import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Divider
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './DonationModal.css';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 800,
    width: 720,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
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

const DonationModal = props => {
  const { className, open, handleClose, url, ...rest } = props;
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
        style={{width: '40.75%', margin: 'auto'}}
        className={clsx(classes.root, className)}
      >
        <CardContent>
          <iframe src={url} width="800" height="720"/>
        </CardContent>
      </Card>
    </Modal>
  );
};

DonationModal.propTypes = {
  className: PropTypes.string,
  animal: PropTypes.object.isRequired
};

export default DonationModal;
