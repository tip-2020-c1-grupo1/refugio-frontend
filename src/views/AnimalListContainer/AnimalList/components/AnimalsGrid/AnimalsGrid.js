import React from "react";
import { Grid } from '@material-ui/core';
import AnimalCard from "../AnimalCard";

import './AnimalGrid.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const AnimalGrid = props => {
  const { data, isLanding , reload, user } = props;
  return (
    <React.Fragment
    >
      <div className='content'>
        {!data || data.count === 0 
        ? <h2> No hay mascotas que coincidan con tu busqueda </h2>
        : isLanding 
        ? 
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .1"
          transitionDuration={100}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-margin-20-px"
        >
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
