import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import submitAdoptionRequest from './AnimalAdoptionApi'
import cogoToast from 'cogo-toast';

const AdoptionSubmit = props => {

    const useStyles = makeStyles(theme => ({
        button: {
            height: 50,
            width: 139,
            size: 'small',
            fontSize: '10px'
        }
    }));

    const classes = useStyles()

    const {animal, user} = props;

    const errorCallback = err => {
        cogoToast.error(err.response.data.Error, {
            position: 'top-center'
        })
    };

    const adoptionRequest = () => {
        console.log()
        submitAdoptionRequest(animal.id, user.email).then(response => {
            cogoToast.success(response.data.Ok, {
                position: 'top-center'
            });
        })
            .catch(err => {
                errorCallback(err);
            })
    };

    const isAvailable = animal.status_request === 'DISPONIBLE'

    return (
        <Button variant='outlined'
            color='primary'
            className={classes.button}
            onClick={adoptionRequest}
    disabled={!isAvailable}>{isAvailable ? 'Solicitar adopción' : 'No disponible'}</Button>
    )
}

export default AdoptionSubmit;