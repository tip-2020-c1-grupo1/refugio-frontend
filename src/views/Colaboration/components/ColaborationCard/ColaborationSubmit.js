import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import cogoToast from 'cogo-toast';
import submitAdoptionRequest from './ColaborationAdoptionApi'


const ColaborationSubmit = props => {

    const useStyles = makeStyles(theme => ({
        button: {
            height: 50,
            width: 139,
            size: 'small',
            fontSize: '10px'
        }
    }));

    const classes = useStyles()

    const {colaboration, user, reloadColabs} = props;

    const errorCallback = err => {
        cogoToast.error(err.response.data.Error, {
            position: 'top-center'
        })
    };

    const adoptionRequest = () => {
        submitAdoptionRequest(colaboration.id, user.email).then(response => {
            reloadColabs();
            cogoToast.success(response.data.Ok, {
                position: 'top-center'
            });
        })
            .catch(err => {
                errorCallback(err);
            })
    };

    const isAvailable = colaboration.status_request == 'Disponible'

    return (
        <Button variant='outlined'
            color='primary'
            className={classes.button}
            onClick={adoptionRequest}
            disabled={!isAvailable}>{isAvailable ? 'Quiero colaborar !' : 'No disponible'}</Button>
    )
}

export default ColaborationSubmit;