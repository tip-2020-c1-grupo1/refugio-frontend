import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Link, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const AnimalsPagination = props => {
  const { classes, getPrevPage, getNextPage, pages, getAnimalsPage, selectedPage, previousUrl, nextUrl} = props;
  const {} = props;
  
  const getPrev = () => {
    getPrevPage(selectedPage);
  };

  const getNext = () => {
    getNextPage(selectedPage);
  };

  return (
    <div className={classes.pagination}>
      <IconButton disabled={!previousUrl} onClick={getPrev}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography className={classes.typographyClass}>
        {pages.map(page => (
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              getAnimalsPage(page)
            }}
          >
            <span className={page == selectedPage ? classes.selectedPage : classes.nonSelectedPage}>
              {page}
            </span>
          </Link>
        ))}    
      </Typography>        
      
      <IconButton disabled={!nextUrl} onClick={getNext}>
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

/*
AnimalsPagination.propTypes = {
  className: PropTypes.string
};
*/

export default AnimalsPagination;
