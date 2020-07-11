import React from "react";
import { Grid, Typography } from '@material-ui/core';
import ColaborationCard from "../ColaborationCard";
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


const ColaborationGrid = props => {
  const { data, reloadColabs, isLanding , classes, user } = props;
  


  return (
    <React.Fragment>
      <div className={classes.content}>
        {data.count === 0 
        ? <Typography variant="h2"> Aún no hay colaboraciones necesitadas </Typography>
        : isLanding
        ? <Carousel
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
