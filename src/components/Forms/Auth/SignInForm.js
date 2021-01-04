import Box from "@material-ui/core/Box";
import {Field, Form} from "react-final-form";
import {i18n} from "../../../utils/i18n";
import {Button, TextField} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import {Trans} from "@lingui/macro";
import React from "react";

const SignInForm = (props) => {
    return (
        <Form
            onSubmit={props.onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Box p={1}>
                        <Field name="email" type="email" id="signin-email" label={i18n._("E-Mail")}>
                            {props => (
                                <TextField variant="outlined" fullWidth {...props} {...props.input} />
                            )}
                        </Field>
                    </Box>
                    <Box p={1}>
                        <Field name="password" type="password" id="signin-password" label={i18n._("Password")}>
                            {props => (
                                <TextField variant="outlined" fullWidth {...props} {...props.input} />
                            )}
                        </Field>
                    </Box>
                    <Box p={1}>
                        <FormControlLabel control={
                            <Field name="rememberUser" type="checkbox" id="login-remember-user" label={i18n._("Remember me")}>
                                {props => (
                                    <Checkbox {...props.input}/>
                                )}
                            </Field>
                        } label={i18n._("Remember me")} />
                    </Box>
                    <Divider variant="middle"/>
                    <Button fullWidth type="submit" className="shadow-2 mb-4"><Trans>Login</Trans></Button>
                </form>
            )}/>
    );
}

export default SignInForm;