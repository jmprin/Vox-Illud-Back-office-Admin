import React from 'react';
import { Link } from "react-router-dom";
import config from '../../constants/config.json';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Trans } from '@lingui/macro';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    textCenter: {
        textAlign: 'center'
    },
    card: {
        maxWidth: '40%'
    }
}));

const Home = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Paper className={classes.card}>
                <Box p={4} className={`${classes.textCenter}`}>
                    <h1>
                        <Trans>Welcome to the {config.app.name} Portal</Trans>
                    </h1>
                    <div>
                        <Link to='/signin'>
                            <Button>
                                <Trans>Go to Portal</Trans>
                            </Button>
                        </Link>
                    </div>
                </Box>
            </Paper>
        </div>
    );
}

export default Home;