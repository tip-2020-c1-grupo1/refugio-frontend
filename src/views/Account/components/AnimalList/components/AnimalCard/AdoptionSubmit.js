import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import cancelAdoptionRequest from './AnimalAdoptionApi'
import cogoToast from 'cogo-toast';

const AdoptionSubmit = props => {

    const useStyles = makeStyles(theme => ({
        button: {
            height: 65,
            width: 139,
            fontSize: '10px'
        }
    }));

    const classes = useStyles()

    const {animal, reload, user} = props;

    const errorCallback = err => {
        cogoToast.error(err.response.data.Error, {
            position: 'top-center'
        })
    };

    const adoptionRequest = () => {
        cancelAdoptionRequest(animal.id, user.email).then(response => {
            reload();
            cogoToast.success(response.data.Ok, {
                position: 'top-center'
            });
            
        })
            .catch(err => {
                errorCallback(err);
            })
    };

    if (animal.status_request === 'Adoptado' || animal.status_request === 'Revisión' ) {
        return <Button variant='outlined'
            color='disabled'
            disabled={true}
            className={classes.button}>{'ADOPTADO'}
        </Button> 
    }

    return (
        
        <Button variant='outlined'
            color='primary'
            className={classes.button}
            onClick={adoptionRequest}>{'Cancelar solicitud de adopción'}</Button> 

    )
}

export default AdoptionSubmit;