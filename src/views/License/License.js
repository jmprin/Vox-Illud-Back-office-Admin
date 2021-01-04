import React, {useEffect, useRef, useState} from 'react';
import LicenseService from "../../http-services/license.service";
import Alert from "../../components/Alert/Alert";
import CreateLicenseForm from "../../components/Forms/License/CreateLicenseForm";
import LicenseList from "../../components/License/LicenseList";

const License = (props) => {
    const [loading, setLoading] = useState(false);
    const [licenses, setLicenses] = useState([]);
    const alertRef = useRef(null);

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

    useEffect(() => getLicenses(), []);

    const createLicense = (values, form) => {
        LicenseService.createLicense(values)
            .then(response => {
                getLicenses();
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                }
                setLoading(false);
            })
    }

    return (
        <div>
            <Alert ref={alertRef}/>
            <CreateLicenseForm onSubmit={createLicense}/>
            <LicenseList licenses={licenses}/>
        </div>
    );
}

export default License;