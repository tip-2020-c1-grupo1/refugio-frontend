import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import submitAdoptionRequest from './AnimalAdoptionApi'
import cogoToast from 'cogo-toast';
import {filter} from 'lodash';

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

    const {animal, reload, user} = props;

    const errorCallback = err => {
        if (err.response) {
            cogoToast.error(err.response.data.Error, {
                position: 'top-center'
            });
        }        
    };

    const adoptionRequest = () => {
        submitAdoptionRequest(animal.id, user.email).then(response => {
            reload();
            cogoToast.success(response.data.Ok, {
                position: 'top-center'
            });
            
        })
            .catch(err => {
                errorCallback(err);
            })
    };

    const renderButton = () => { 
        console.log(user.email)
        
        const youRequested = filter(animal.requesters, function(requester) {
            return requester.user ? requester.user.email == user.email : false
        }).length > 0;
        const isAvailable = animal.status_request == 'Disponible' 
        // && !youRequested;
        const message = isAvailable ? (!youRequested ? 'Solicitar adopción' : 'Ya envio solicitud para adoptarlo') : 'No disponible';
        
        return <Button variant='outlined'
        color='primary'
        className={classes.button}
        onClick={adoptionRequest}
        disabled={!isAvailable || youRequested}>{message}</Button>  
    } 

    const renderEmpty = () => { return <React.Fragment /> }
    
    return (
        user.email ? renderButton() : renderEmpty()
    )
}

export default AdoptionSubmit;