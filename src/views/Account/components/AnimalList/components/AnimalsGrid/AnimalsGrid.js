import React from "react";
import { Grid } from '@material-ui/core';
import AnimalCard from "../AnimalCard";
import Carousel from 'react-material-ui-carousel'
import './AnimalGrid.css';

const AnimalGrid = props => {
  const { data, isLanding , reload, user } = props;
  return (
    <React.Fragment
    >
      <div className='content'>
        {!data || data.count === 0 
        ? <h2> No hay mascotas que coincidan con tu busqueda </h2>
        : isLanding 
        ? <Carousel>
          {data.results.map(animal => (
            <AnimalCard reload={reload} isLanding={isLanding} animal={animal} user={user} />))}
          </Carousel>
        : <Grid container spacing={3}>
        {data.results.map(animal => (<Grid item key={animal.id} lg={4} md={6} xs={12}>
          <AnimalCard reload={reload} isLanding={isLanding} animal={animal} user={user} />
        </Grid>))}
      </Grid>
      }
      </div>

    </React.Fragment>
  );
};

export default AnimalGrid;
