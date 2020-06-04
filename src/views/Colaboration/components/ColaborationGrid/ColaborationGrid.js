import React from "react";
import { Grid } from '@material-ui/core';
import ColaborationCard from "../ColaborationCard";
import Carousel from 'react-material-ui-carousel'


const ColaborationGrid = props => {
  const { data, reloadColabs, isLanding , classes, user } = props;
  


  return (
    <React.Fragment
    >
      <div className={classes.content}>
        {data.count === 0 
        ? <h2> No hay mascotas que coincidan con tu busqueda </h2>
        : <Carousel>
        {data.results.map(colaboration => (
          <ColaborationCard reloadColabs={reloadColabs} isLanding={isLanding} colaboration={colaboration} user={user} />))}
        </Carousel>
      }
      </div>

    </React.Fragment>
  );
};

export default ColaborationGrid;
