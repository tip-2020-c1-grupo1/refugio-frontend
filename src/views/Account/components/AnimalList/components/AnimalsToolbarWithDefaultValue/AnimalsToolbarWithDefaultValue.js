import React, { useState } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import MultiSelect from "react-multi-select-component";
import { SearchInput } from 'components';
import './AnimalsToolbarWithDefaultValue.css';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  multiselect: {
    display: 'flex',
  }

}));

const options = [
  { label: "Nombre", value: "name" },
  { label: "Especie", value: "species" },
  { label: "Raza", value: "race" },
];

const AnimalsToolbarWithDefaultValue = props => {
  const { className, ...rest } = props;
  const { applySearch, selectedFilters, setSelectedFilters, 
    setSearchString} = props;
  const classes = useStyles();

  const applyFilter = (e) => {
    setSelectedFilters(e);
  }
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
          onChange={(e) => setSearchString(e.target.value)}
          className={classes.searchInput}
          placeholder="Busque su mascota aquí"
        />
        <MultiSelect
          options={options}
          value={selectedFilters}
          onChange={applyFilter}
          selectAllLabel={'Seleccionar todos'}
          labelledBy={"Select"}
          className={classes.multiselect}
        />
        <Button disabled={selectedFilters && selectedFilters.length == 0
          } onClick={applySearch}> Aplicar Busqueda</Button>
      </div>
    </div>
  );
};

AnimalsToolbarWithDefaultValue.propTypes = {
  className: PropTypes.string
};

export default AnimalsToolbarWithDefaultValue;
