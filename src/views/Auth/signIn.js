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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Trans } from "@lingui/macro";
import {i18n} from "../../utils/i18n";
import queryString from 'query-string';
import SignInForm from "../../components/Forms/Auth/SignInForm";

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

const SignInPage = (props) => {
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loading, setLoading] = useState(false);
    const alertRef = useRef(null);

    let signIn = values => {
        alertRef.current.hide();
        setLoading(true);
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
                setLoading(false);
            })
    };

    return (
        <>
            {Auth.isAuthenticated() && <Redirect to="/dashboard"/>}
            <BackdropLoader open={loading} />
            <div className={classes.container}>
                <Paper className={classes.card}>
                    <Alert ref={alertRef} />
                    <Box p={4}>
                        <h1><Trans>Welcome to the {config.app.name} Portal</Trans></h1>
                        <h4><Trans>You have to sign in to continue</Trans></h4>
                        <SignInForm onSubmit={signIn} />
                        <MuiLink button>
                            <Link to={'/signup'}><Trans>Sign Up</Trans></Link>
                        </MuiLink>
                    </Box>
                </Paper>
            </div>
        </>
    );
}

export default SignInPage;