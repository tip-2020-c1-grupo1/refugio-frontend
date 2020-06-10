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
import AdoptionSubmit from './AdoptionSubmit';

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

const AnimalCard = props => {
  const { className, animal, user, ...rest } = props;

  const classes = useStyles();
  const [data, setData] = useState([]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>

        <div className={classes.imageContainer}>
          <img
            alt="Animal"
            className={classes.image}
            src={animal.images[0].image}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {animal.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {animal.description}
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
              {animal.gender} - {animal.race} - {animal.species} | ESTADO : {animal.status_request}
            </Typography>

          </Grid>
          <Grid className={classes.statsItem} item>
            <AdoptionSubmit user={user} animal={animal}/>
          </Grid>
        </Grid>
        
      </CardActions>
    </Card>
  );
};

AnimalCard.propTypes = {
  className: PropTypes.string,
  animal: PropTypes.object.isRequired
};

export default AnimalCard;
