import React from 'react';
import {i18n} from '../../../utils/i18n';
import {Trans} from '@lingui/macro';
import {Field, Form} from "react-final-form";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { formatSeconds } from '../../../utils/common';

// const SelectInput = ({
//                          input: { name, value, onChange, ...restInput },
//                          meta,
//                          label,
//                          formControlProps,
//                          ...rest
//                      }) => {
//     return (
//         <Select
//             {...rest}
//             name={name}
//             onChange={onChange}
//             inputProps={restInput}
//             value={value}
//             variant="outlined"
//             fullWidth
//         />
//     );
// };

const CreateLicenseForm = (props) => {

    return (
        <Form
            onSubmit={props.onSubmit}
            {...props}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Box p={1}>
                        <Field name="title" placeholder={i18n._("Démo")} label={i18n._("Title")}>
                            {props => <TextField variant="outlined" fullWidth {...props} {...props.input}/>}
                        </Field>
                    </Box>
                    <Box p={1}>
                        <Field name="quota" type={'number'} placeholder={i18n._("3600")} label={i18n._("Quota (en secondes)")}>
                            {props => <TextField variant="outlined" fullWidth {...props} {...props.input}/>}
                        </Field>
                        {values.quota > 0 && <span><Trans>Equals to</Trans> { formatSeconds(values.quota, ['H','m']) }</span>}
                    </Box>
                    <Divider variant="middle"/>
                    <Button fullWidth type="submit" className="shadow-2 mb-4"><Trans>Create License</Trans></Button>
                </form>
            )}/>
    );
}

export default CreateLicenseForm;