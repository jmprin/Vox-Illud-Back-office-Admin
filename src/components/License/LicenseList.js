import React from 'react';
import {Trans} from "@lingui/macro";
import { formatSeconds } from '../../utils/common';
import { List, ListItem, ListItemText, Grid } from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    fs: {
        fontSize: '20px',
    }

});

const LicenseList = (props) => {

    const classes = useStyles();
    
    const renderItems = () =>{

        return props.licenses.map( (license) => 
            <ListItem>
                <ListItemText
                primary={`${license.title} ${license.quota} secondes`}
                secondary={formatSeconds(license.quota,['H','m'])}
                />
            </ListItem>
        );
    }


    return (
        <div>
            <h2><Trans>Current Licenses:</Trans></h2>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div >
                        <List>
                        {renderItems()}
                        </List>
                    </div>
                </Grid>
            </Grid>
           
        </div>
    );
}

export default LicenseList;