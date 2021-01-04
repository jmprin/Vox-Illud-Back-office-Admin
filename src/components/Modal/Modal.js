import React from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import {default as MuiModal} from '@material-ui/core/Modal';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Modal = (props) => {
    const classes = useStyles();
    return (
        <MuiModal
            className={classes.modal}
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
        >
            <Fade in={props.open}>
                <div className={classes.paper}>
                    {props.children}
                </div>
            </Fade>
        </MuiModal>
    );
}

export default Modal;