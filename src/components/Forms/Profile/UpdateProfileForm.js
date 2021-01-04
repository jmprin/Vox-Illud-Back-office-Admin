import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Field, Form} from "react-final-form";
import {i18n} from "../../../utils/i18n";
import {Button, TextField} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {Trans} from "@lingui/macro";
import React from "react";

const UpdateProfileForm = (props) => {
    return (
        <Form
            onSubmit={props.onSubmit}
            {...props}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box p={1}>
                                <Field name="first_name" id="signup-first-name" label={i18n._("First Name")}>
                                    {props => (
                                        <TextField variant="outlined" fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box p={1}>
                                <Field name="last_name" id="signup-last-name" label={i18n._("Last Name")}>
                                    {props => (
                                        <TextField variant="outlined" fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box p={1}>
                        <Field name="email" type="email" id="signin-email" label={i18n._("E-Mail")}>
                            {props => (
                                <TextField variant="outlined" fullWidth {...props} {...props.input} />
                            )}
                        </Field>
                    </Box>
                    <Divider variant="middle"/>
                    <Button fullWidth type="submit" className="shadow-2 mb-4"><Trans>Update my Profile</Trans></Button>
                </form>
            )}/>
    );
}

export default UpdateProfileForm;