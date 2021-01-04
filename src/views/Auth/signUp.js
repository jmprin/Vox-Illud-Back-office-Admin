import React, { useState, useRef } from 'react';
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import Auth from "../../utils/auth";
import {Field, Form} from "react-final-form";
import { Button, TextField } from '@material-ui/core';
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import Alert from "../../components/Alert/Alert";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import config from "../../constants/config.json";
import Divider from "@material-ui/core/Divider";
import {default as MuiLink} from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import { Trans } from "@lingui/macro";
import {i18n} from "../../utils/i18n";
import queryString from "query-string";
import SignUpForm from "../../components/Forms/Auth/SignUpForm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    card: {
        maxWidth: '40%'
    }
}));

const SignUpPage = (props) => {
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loading, setLoading] = useState(false);
    const alertRef = useRef(null);

    let signUp = values => {
        setLoading(true);
        Auth.signUp(values)
            .then(response => {
                Auth.signIn(values)
                    .then(response => {
                        setLoading(false);
                        history.push('/dashboard');
                        // window.location.reload();
                    })
                    .catch(error => {
                        if (error.response) {
                            alertRef.current.toggle('error', error.response.data.message);
                            console.error(error.response)
                        } else {
                            alertRef.current.toggle('error', error);
                            console.error(error);
                        }
                    })
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                    console.error(error.response)
                } else {
                    alertRef.current.toggle('error', error);
                    console.error(error);
                }
                setLoading(false);
            })
    };

    return (
        <>
            <Redirect to={'/signin'}/>
            {/*<BackdropLoader open={loading} />*/}
            {/*<div className={classes.container}>*/}
            {/*    <Paper className={classes.card}>*/}
            {/*        <Alert ref={alertRef} />*/}
            {/*        <Box p={4}>*/}
            {/*            <h1><Trans>Welcome to the {config.app.name} Portal</Trans></h1>*/}
            {/*            <h4><Trans>You have to create your account to continue</Trans></h4>*/}
            {/*            <SignUpForm onSubmit={signUp} />*/}
            {/*            <MuiLink button>*/}
            {/*                <Link to={'/signin'}><Trans>Sign In</Trans></Link>*/}
            {/*            </MuiLink>*/}
            {/*        </Box>*/}
            {/*    </Paper>*/}
            {/*</div>*/}
        </>
    );
}

export default SignUpPage;