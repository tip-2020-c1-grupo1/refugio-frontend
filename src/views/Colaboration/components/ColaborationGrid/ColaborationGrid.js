import React from "react";
import { Grid, Typography } from '@material-ui/core';
import ColaborationCard from "../ColaborationCard";
import Carousel from 'react-material-ui-carousel'


const ColaborationGrid = props => {
  const { data, reloadColabs, isLanding , classes, user } = props;
  


  return (
    <React.Fragment>
      <div className={classes.content}>
        {data.count === 0 
        ? <Typography variant="h2"> Aún no hay colaboraciones necesitadas </Typography>
        : isLanding
        ? <Carousel>
        {data.results.map(colaboration => (
          <ColaborationCard reloadColabs={reloadColabs} isLanding={isLanding} colaboration={colaboration} user={user} />))}
        </Carousel>
        :
        <Grid container spacing={3}>
        {data.results.map(colaboration => (
          <Grid item key={colaboration.id} lg={4} md={6} sm={12}>
            <ColaborationCard reloadColabs={reloadColabs} isLanding={isLanding} colaboration={colaboration} user={user} />
          </Grid>
          ))}
        </Grid>
      }
      </div>

    </React.Fragment>
  );
};

export default ColaborationGrid;
