import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import cogoToast from 'cogo-toast';
import removeColabRequest from './ColaborationAdoptionApi'


const ColaborationSubmit = props => {

    const useStyles = makeStyles(theme => ({
        button: {
            height: 65,
            width: 139,
            fontSize: '10px'
        }
    }));

    const classes = useStyles()

    const {colaboration, user, reloadColabs, isAlreadyColab} = props;

    const errorCallback = err => {
        cogoToast.error(err.response.data.Error, {
            position: 'top-center'
        })
    };

    const removeMeFromColabRequest = () => {
        console.log(colaboration);
        removeColabRequest(colaboration.id, user.email).then(response => {
            reloadColabs();
            cogoToast.success(response.data.Ok, {
                position: 'top-center'
            });
        })
            .catch(err => {
                errorCallback(err);
            })
    };

    console.log(colaboration);
    if (colaboration.status_request === 'Confirmado') {
        return <React.Fragment />
    }
    return (
        <Button variant='outlined'
            color='primary'
            className={classes.button}
            onClick={removeMeFromColabRequest}>{ 'Cancelar mi colaboración'}</Button>
    )
}

export default ColaborationSubmit;