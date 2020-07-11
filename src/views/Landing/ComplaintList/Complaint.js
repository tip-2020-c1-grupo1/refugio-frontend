import React from 'react';
import {
  Card,
  CardContent
} from '@material-ui/core';

const Complaint = props => {
  
  return (
    <Card style={{marginBottom: '5px'}}
    >
      <CardContent>
        {props.data}
      </CardContent>
    </Card>
  );
};

export default Complaint;
