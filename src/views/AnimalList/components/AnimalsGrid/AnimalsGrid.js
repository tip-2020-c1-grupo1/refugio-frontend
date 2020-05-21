import React from "react";
import { Grid } from '@material-ui/core';
import AnimalCard from "../AnimalCard";

const AnimalGrid = props => {
  const { data , classes, user } = props;
  
  return (
    <React.Fragment
    >
      <div className={classes.content}>
        {data.count === 0 
        ? <h2> No hay mascotas que coincidan con tu busqueda </h2>
        : <Grid container spacing={3}>
        {data.results.map(animal => (<Grid item key={animal.id} lg={4} md={6} xs={12}>
          <AnimalCard animal={animal} user={user} />
        </Grid>))}
      </Grid>
      }
      </div>

    </React.Fragment>
  );
};

export default AnimalGrid;
