import React, {useRef, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import config from '../../constants/config.json';
import QuotaPreview from "../../components/Dashboard/QuotaPreview/QuotaPreview";
import Grid from "@material-ui/core/Grid";
import {Trans} from "@lingui/macro";
import Alert from "../../components/Alert/Alert";
import CreateUserForm from "../../components/Forms/User/CreateUserForm";
import UserService from '../../http-services/user.service';
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import {i18n} from "../../utils/i18n";

const CreateUser = (props) => {
    const alertRef = useRef();
    const [loading, setLoading] = useState(false);

    const createUser = (values, form) => {
        setLoading(true);
        UserService.createUser(values)
            .then(response => {
                alertRef.current.toggle('success', i18n._("User Created!"));
                form.reset();
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                } else {
                    alertRef.current.toggle('error', error.toString());
                }
                setLoading(false);
            })
    }

    return (
        <div>
            <BackdropLoader open={loading}/>
            <Alert ref={alertRef} />
            <CreateUserForm onSubmit={createUser} />
        </div>
    );
}

export default CreateUser;