import React, {useEffect, useRef, useState} from 'react';
import UserService from '../../http-services/user.service';
import Alert from "../../components/Alert/Alert";
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import {i18n} from "../../utils/i18n";
import {default as MaterialTable} from "../../components/MaterialTable/MaterialTable";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import LicenseService from "../../http-services/license.service";
import { useHistory } from "react-router-dom";

import _ from "lodash";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const AssignLicense = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const alertRef = useRef();

    const [licenses, setLicenses] = useState([]);
    const getLicenses = () => {
        LicenseService.getLicenses()
            .then(response => {
                setLicenses(response.data);
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

    const getUsers = (callback) => {
        setLoading(true);
        UserService.getUsers()
            .then(response => {
                setUsers(response.data);
                setLoading(false);
                if (callback) {
                    callback();
                }
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                }
                alertRef.current.toggle('error', error.toString());
                setLoading(false);
            })
    }

    useEffect(() => {
        getUsers();
        getLicenses();
    }, []);

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const renderLicenseColumn = (props) => {
        
        if (_.isEmpty(props.licenses)){
            return '/';
        }

        let lastLicense = _.last(props.licenses);
        return (
            lastLicense.license.title
        );
    }

    const licenseColumnEditComponent = (props) => {
        return (
            <Select fullWidth onChange={e => props.onChange(e.target.value)} defaultValue={props.value} value={props.value}>
                {licenses.map(license => (
                    <MenuItem value={license._id}>{license.title}</MenuItem>
                ))}
            </Select>
        )
    }

    const onRowClick = (e,rowData) =>{
        history.push(`/show-user/${rowData._id}`)
    }

    const columns = [
        { field: 'first_name', title: i18n._("First Name"), minWidth: 120 },
        { field: 'last_name', title: i18n._("Last Name"), minWidth: 120 },
        { field: 'email', title: i18n._("E-Mail"), minWidth: 200, align: 'left' },
        { field: 'license', title: i18n._("License"), minWidth: 100, align: 'right', render: renderLicenseColumn, editComponent: licenseColumnEditComponent}
    ];

  
    return (
        <>
            <Alert ref={alertRef}/>
            <BackdropLoader open={loading}/>
            <MaterialTable
                onRowClick={onRowClick}
                columns={columns}
                data={users}
                title={i18n._("Users")}
                editable={{
                    onRowAdd: (newData) => new Promise((resolve) => {
                        UserService.createUser(newData)
                            .then(() => {
                                getUsers(() => {
                                    resolve();
                                    alertRef.current.toggle('success', i18n._("Account Created") + ` - ${newData.email}`);
                                });
                            })
                            .catch(error => {
                                if (error.response) {
                                    alertRef.current.toggle('error', error.response.data.message);
                                }
                            })
                    }),
                    onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                        UserService.updateUser(newData)
                            .then(() => {
                                getUsers(() => {
                                    resolve();
                                    alertRef.current.toggle('success', i18n._("Account Updated") + ` - ${newData.email}`);
                                });
                            })
                            .catch(error => {
                                if (error.response) {
                                    alertRef.current.toggle('error', error.response.data.message);
                                }
                            })
                    }),
                    onRowDelete: (oldData) => new Promise((resolve) => {
                        UserService.deleteUser(oldData)
                            .then(response => {
                                console.log(response);
                                getUsers(() => {
                                    resolve();
                                    alertRef.current.toggle('success', i18n._("Account Deleted"));
                                });
                            })
                            .catch(error => {
                                if (error.response) {
                                    alertRef.current.toggle('error', error.response.data.message);
                                }
                            })
                    })
                }}
            />
        </>
    );
}

export default AssignLicense;