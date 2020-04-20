import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const AnimalsToolbar = props => {
  const { className, ...rest } = props;
  const {applySearch, setSearchString} = props;
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
          onChange={(e) => setSearchString(e.target.value)}
          className={classes.searchInput}
          placeholder="Search product"
        />
        <Button onClick={applySearch}> Aplicar Busqueda</Button>
      </div>
    </div>
  );
};

AnimalsToolbar.propTypes = {
  className: PropTypes.string
};

export default AnimalsToolbar;
