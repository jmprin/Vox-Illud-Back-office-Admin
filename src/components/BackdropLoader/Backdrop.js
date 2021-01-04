import React from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const BackdropLoader = (props) => {
    return (
        <Backdrop open={props.open} style={{ zIndex: 9999 }}>
            <CircularProgress color="white" />
        </Backdrop>
    );
}

export default BackdropLoader;