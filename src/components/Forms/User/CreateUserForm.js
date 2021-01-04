import React, {useEffect, useState} from 'react';
import {i18n} from '../../../utils/i18n';
import {Trans} from '@lingui/macro';
import {Field, Form} from "react-final-form";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LicenseService from '../../../http-services/license.service';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const SelectInput = ({
 input: { name, value, onChange, ...restInput },
 meta,
 label,
 formControlProps,
 ...rest
}) => {
    return (
            <Select
                {...rest}
                name={name}
                onChange={onChange}
                inputProps={restInput}
                value={value}
                variant="outlined"
                fullWidth
            />
    );
};

const CreateUserForm = (props) => {
    const [licenses, setLicenses] = useState([]);
    useEffect(() => {
        LicenseService.getLicenses()
            .then(response => {
                setLicenses(response.data);
            })
    }, []);

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
                        <Field name="email" type="email" id="create-user-email" label={i18n._("E-Mail")}>
                            {props => (
                                <TextField variant="outlined" fullWidth {...props} {...props.input} />
                            )}
                        </Field>
                    </Box>
                    <Box p={1}>
                        <Field name="password" id="create-user-password" label={i18n._("Password")}>
                            {props => (
                                <TextField variant="outlined" fullWidth {...props} {...props.input} />
                            )}
                        </Field>
                    </Box>
                    <Box p={1}>
                        <Field name="license" id="create-user-license" label={i18n._("License")}>
                            {props => <SelectInput {...props} {...props.input} >
                                {licenses.map(license => <MenuItem value={license}>{license.title}</MenuItem>)}
                            </SelectInput>}
                        </Field>
                    </Box>
                    <Divider variant="middle"/>
                    <Button fullWidth type="submit" className="shadow-2 mb-4"><Trans>Create User</Trans></Button>
                </form>
            )}/>
    );
}

export default CreateUserForm;