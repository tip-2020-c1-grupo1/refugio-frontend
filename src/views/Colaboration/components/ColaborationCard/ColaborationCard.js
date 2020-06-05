import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Divider
} from '@material-ui/core';
import ColaborationModal from './ColaborationModal';
import ColaborationModalOpen from './ColaborationModalOpen';
import ColaborationSubmit from './ColaborationSubmit';
import cogoToast from 'cogo-toast';

// <RouterLink {...props} />

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 200,
    width: 200,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  button: {
    size: 'large',
    marginLeft: 13
  }
}));

const ColaborationCard = props => {
  const { className, reloadColabs, isLanding, colaboration, user, ...rest } = props;

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const errorCallback = (err) => {
    cogoToast.error(err.response.data.Error, {
      position: 'top-center'
    })
  };


  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>

        <ColaborationModal 
          handleClose={handleClose}
          reloadColabs={reloadColabs}
          colaboration={colaboration}
          open={open}
          user={user}
        />

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
          {colaboration.short_description}
        </Typography>

        {isLanding ? <React.Fragment /> : <React.Fragment >
          <Divider />
          <Typography
          align="center"
          variant="body1"
        >
          {colaboration.description}
        </Typography>
        </React.Fragment >
        }

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
              ESTADO : {colaboration.status_request}
            </Typography>

          </Grid>
          <Grid className={classes.statsItem} item> 
            <ColaborationModalOpen isLanding={isLanding} onClick={handleOpen} />   
            {
              isLanding ? <React.Fragment /> : <ColaborationSubmit reloadColabs={reloadColabs} user={user} colaboration={colaboration}/>
            }     
            
          </Grid>  
        </Grid>         
           
      </CardActions>
    </Card>
  );
};

ColaborationCard.propTypes = {
  className: PropTypes.string,
  colaboration: PropTypes.object.isRequired
};

export default ColaborationCard;
