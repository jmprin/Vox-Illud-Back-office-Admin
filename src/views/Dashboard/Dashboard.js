import React from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Auth from '../../utils/auth';
import config from '../../constants/config.json';
import QuotaPreview from "../../components/Dashboard/QuotaPreview/QuotaPreview";
import Grid from "@material-ui/core/Grid";
import {Trans} from "@lingui/macro";

const Dashboard = (props) => {
    return (
        <>
            <h1><Trans>Welcome to the {config.app.name} Portal</Trans></h1>
            <Grid container>
                <Grid item lg={6} md={8} xs={12}>
                    <QuotaPreview/>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;