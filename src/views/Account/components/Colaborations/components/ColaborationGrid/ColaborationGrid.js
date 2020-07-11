import React from "react";
import { Grid } from '@material-ui/core';
import ColaborationCard from "../ColaborationCard";
import Carousel from 'react-material-ui-carousel';


const ColaborationGrid = props => {
  const { data, reloadColabs, isLanding , classes, user } = props;
  
  return (
    <div className={classes.content}>
      {data.count === 0 
      ? <p> No tenes colaboraciones </p>
      : isLanding
      ? <Carousel>
      {data.results.map(colaboration => (
        <ColaborationCard key={'colaboration-card' + colaboration.id } reloadColabs={reloadColabs} isLanding={isLanding} colaboration={colaboration} user={user} />))}
      </Carousel>
      :
      <Grid container spacing={3}>
      {data.results.map(colaboration => (
        <Grid item key={colaboration.id} lg={6} md={6} sm={12}>
          <ColaborationCard key={'colaboration-card' + colaboration.id }reloadColabs={reloadColabs} isLanding={isLanding} colaboration={colaboration} user={user} />
        </Grid>
        ))}
      </Grid>
    }
    </div>
  );
};

export default ColaborationGrid;
