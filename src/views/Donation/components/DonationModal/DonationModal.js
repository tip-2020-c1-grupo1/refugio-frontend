import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  responsiveFontSizes
} from '@material-ui/core';
import ResponsiveEmbed from 'react-responsive-embed';
import Modal from '@material-ui/core/Modal';
import './DonationModal.css';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '3%'
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
      className={classes.imageContainer}
    >
      <Card
        {...rest}
        style={{width: '62%', margin: 'auto'}}
        className={clsx(classes.root, className)}
      >
        <CardContent>
          {/* <iframe src={url} width="800" height="720"/> */}
          <ResponsiveEmbed src={url} />
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
