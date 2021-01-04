import React from "react";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const LinearProgressWithLabel = (props) => {
    return (
        <Box display="flex" alignItems="center">
            <Paper elevation={4} style={{ width: "100%" }}>
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
            </Paper>
            {props.value &&
                <Box minWidth={35}>
                    <Typography variant="h5" color="textSecondary" style={{ marginLeft: 10 }}>{Math.round(props.value)}%</Typography>
                </Box>
            }
        </Box>
    );
}

export default LinearProgressWithLabel;