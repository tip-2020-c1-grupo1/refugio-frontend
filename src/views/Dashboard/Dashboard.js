import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from "axios";
import { Grid } from '@material-ui/core';
import MaterialTable from 'material-table';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestAnimals,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));
// material tables

const Dashboard = (props) => {
  const classes = useStyles();
  console.log(props);

  const url = 'http://localhost:8000/api/animals/';

  useEffect(() => {
    console.log('preparing components');
    axios
      .get(url)
      .then(({ data }) => {
        console.log(data);
      });
  }, []);

  
  return (
    <div className={classes.root}>
      <h2> Welcome {props.user.name} </h2>
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Adı', field: 'name' },
            { title: 'Soyadı', field: 'surname' },
            { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
          ]}
          data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }, 
          { name: 'Luciano', surname: 'Olmedo', birthYear: 1989, birthCity: 34 },
          { name: 'Javier', surname: 'Perini', birthYear: 1990, birthCity: 63 },
          { name: 'Nahuel', surname: 'Benitez', birthYear: 1992, birthCity: 34 }
        ]}
          title="Demo Title"
        />
      </div>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestAnimals />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>

  );
};
export default Dashboard;
