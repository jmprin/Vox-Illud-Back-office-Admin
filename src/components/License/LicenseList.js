import React from 'react';
import {Trans} from "@lingui/macro";

const LicenseList = (props) => {
    return (
        <div>
            <h2><Trans>Current Licenses:</Trans></h2>
            {props.licenses.map(license => (
                <div>
                    <h4>{license.title} - {license.quota / 1000}s</h4>
                </div>
            ))}
        </div>
    );
}

export default LicenseList;