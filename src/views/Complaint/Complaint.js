import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Typography, Divider, Button, Box } from '@material-ui/core';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    }
  }));

const Complaint = props => {
    const classes = useStyles();

    const { user } = props;

    console.log(user)

    if (props.user.email === '') {
      return <Redirect to='/' />
    }

    const fiveDivider = [...Array(5)].map((e, i) => <Divider light />);
        // return <Box>
        //         <Divider light />
        //         <Divider light />
        //         <Divider light />
        //         <Divider light />
        //         <Divider light />
        //     </Box>

    return (
      <div className={classes.root}>
        <Typography>
                <Grid 
                    item 
                    xs={3}
                    md={3}>
                    Email:
                    <TextField 
                            value={user.email} 
                            disabled 
                            fullWidth
                            variant="outlined"/>
                </Grid>
        </Typography>
        {fiveDivider}
        <Typography>
                <Grid item >
                    Descripción:
                    
                    <TextField 
                                    multiline
                                    rows={2}
                                    rowsMax={10}
                                    fullWidth
                                    variant="outlined"/>
                </Grid>
                {fiveDivider}
                <Button 
                    color="primary"
                    variant="contained">Enviar denuncia</Button>
        </Typography> 
      </div>

      
    );
  };
  
export default Complaint;