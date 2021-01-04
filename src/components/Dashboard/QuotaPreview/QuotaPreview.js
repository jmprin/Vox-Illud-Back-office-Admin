import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import moment from 'moment';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import RefreshIcon from '@material-ui/icons/Refresh';
import UserService from '../../../http-services/user.service';
import LinearProgressWithLabel from "../../Quota/ProgressBar/ProgressBar";
import {Link} from "react-router-dom";

const QuotaPreview = (props) => {
    const [loading, setLoading] = useState(false);
    const [license, setLicense] = useState(null);
    const [usage, setUsage] = useState(null);

    const getUsageDetails = () => {
        setLicense(null);
        setUsage(null);
        UserService.getUsageDetails()
            .then(response => {
                console.log(response.data);
                setUsage(response.data.usage);
                setLicense(response.data.user.license);
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response.data);
                } else {
                    console.error(error);
                }
            })
    }

    useEffect(() => {
        getUsageDetails();
    }, []);

    const formatMs = (ms) => {
        let tempTime = moment.duration(ms);
        if (tempTime.hours() <= 0) {
            return tempTime.minutes() + 'min';
        } else {
            return tempTime.hours() + (tempTime.minutes() > 0 ? ':' + tempTime.minutes() : 'h');
        }
    }

    return (
        <>
            {usage && license ?
                <Link to='/quota'>
                    <Paper>
                        <Box p={2}>
                            <h3>{license.title}</h3>
                            <h5 className='mb-4'>Restant: {formatMs(usage.currentLeft)} (Quota: {formatMs(license.quota)})</h5>
                            <LinearProgressWithLabel value={usage.currentLeft / license.quota * 100}/>
                        </Box>
                    </Paper>
                </Link>
                :
                <div>
                    Loading
                </div>
            }
        </>
    );
}

export default QuotaPreview;