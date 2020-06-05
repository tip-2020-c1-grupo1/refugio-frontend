import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const ColaborationModalOpen = props => {

    const useStyles = makeStyles(theme => ({
        button: {
            height: 50,
            width: 139,
            size: 'small',
            fontSize: '10px'
        }
    }));

    const classes = useStyles()

    const {isLanding} = props;

    if (!isLanding) {
        return <React.Fragment />
    }
    return (
        <Button variant='outlined'
            color='primary'
            className={classes.button}
            onClick={props.onClick}> Ver más </Button>
    )
}

export default ColaborationModalOpen;