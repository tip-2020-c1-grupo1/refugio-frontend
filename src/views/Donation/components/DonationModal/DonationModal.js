import React from 'react';
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

const DonationModal = props => {
  const { className, open, handleClose, ...rest } = props;
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
          <a href='https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=153260243-9f9e41dd-7551-4a29-b7cd-7cca483eadea'> Donar $ 1</a>
          <h3>Para un monto personalizado por favor contacta al refugio</h3>
        </CardContent>
        <Divider />
        <CardActions>
        </CardActions>
      </Card>
    </Modal>
    
  );
};

DonationModal.propTypes = {
  className: PropTypes.string,
  animal: PropTypes.object.isRequired
};

export default DonationModal;
