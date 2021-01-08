import React,{useEffect, useState, useCallback} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import {Trans} from "@lingui/macro";
import {Card, CardContent, Typography, Button, Box, Divider} from '@material-ui/core';
import {default as MaterialTable} from "../../components/MaterialTable/MaterialTable";
import StatsService from '../../http-services/stats.service';
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import { formatSeconds } from '../../utils/common';
import { makeStyles } from '@material-ui/core/styles';
import {Form, Field} from 'react-final-form';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    btn:{
        margin: '15px 0',
        backgroundColor: '#cfdde4',
        "&:hover":{
            backgroundColor: '#7da0b0'
        }
    },
  }));
  

const Statistics = (props) => {


    const [loading,setLoading] = useState(true);
    const [stats,setStats] = useState([]);
    const [sessions,setSessions] = useState([]);
    const [filterDate,setFilterDate] = useState({start:moment().subtract(1, 'month').format('Y-MM-DD'),end: moment().format('Y-MM-DD')})

    const fetchStats = useCallback(async () => {
        let stats = await StatsService.getStats(filterDate);
        setStats(stats.data);
      }, [filterDate])
    
    const fetchSession = useCallback(async () => {
        let stats = await StatsService.getSessions();
        setSessions(stats.data);
    }, [])


    useEffect( () => {

        (async () => {
            try {
                setLoading(true);
                await fetchStats();
                await fetchSession();
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        })();
       
    },[filterDate]);

    const onFilterSubmit = (values,form) => {
     
        if( moment(values.start).isAfter(values.end) ){
            alert('La date de début doit être inférieure à la date de fin !');
            return false;
        };
        
        setFilterDate(values);
    }
    
    const columns = [
        { field: 'conversationId', title: "ID", minWidth: 120 },
        { field: 'host', title: "Hôte", minWidth: 120, render: data => `${data.host.first_name} ${data.host.last_name}` },
        { field: 'participants', title: "Nb participants", minWidth: 120, render: data => data.participants.length === 0 ? 1 : data.participants.length},
        { field: 'created_at', title: "Début", minWidth: 120, render: data => new Date(data.created_at).toLocaleString() },
        { field: 'finished_at', title: "Fin", minWidth: 200, align: 'left', render: data => new Date(data.finished_at).toLocaleString() },
        { field: 'duration', title: "Durée réelle", minWidth: 100, align: 'right',render: data => new Date(data.duration * 1000).toISOString().substr(11, 8) }
    ];

    const classes = useStyles();

    return (
        <>
            <BackdropLoader open={loading} />
            <h1><Trans>Statistics</Trans></h1>

            {/* filters */}
            <Form
                onSubmit={onFilterSubmit}
                initialValues={filterDate}
                render={({ handleSubmit, form, submitting, pristine, values })=>(
                    <form onSubmit={handleSubmit} noValidate>
                    <Grid container direction="row" justify="flex-start" alignItems="center">    
                        {/* <Grid item xs={4}> */}
                            <Box p={1}>
                                <Field name="start">
                                    {props => 
                                    // <TextField variant="outlined" fullWidth {...props} {...props.input}/>
                                    <TextField
                                        {...props.input}
                                        id="start"
                                        name="start"
                                        label="Début"
                                        type="date"
                                        defaultValue={values.start}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    }
                                </Field>
                            </Box>
                        {/* </Grid> */}
                        {/* <Grid item xs={4}> */}
                            <Box p={1}>
                                <Field name="end">
                                    {props => 
                                    // <TextField variant="outlined" fullWidth {...props} {...props.input}/>
                                    <TextField
                                        {...props.input}
                                        id="end"
                                        name="end"
                                        label="Fin"
                                        type="date"
                                        defaultValue={values.start}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    }
                                </Field>
                            </Box>
                        {/* </Grid> */}
                        {/* <Grid item xs={4}> */}
                            <Button type="submit" className={`shadow-2 mb-4 ${classes.btn}`}>Filtrer</Button>
                        {/* </Grid> */}
                    </Grid>
                </form>
                )}
                >
            </Form>
            <Divider />

            {
                stats && !loading &&
                <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            Total comptes utilisateur
                            </Typography>
                            <Typography variant="h5" component="h2" >
                             {stats.total_accounts}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            Total sessions
                            </Typography>
                            <Typography variant="h5" component="h2" >
                            {stats.total_sessions}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            Temps total en conversation
                            </Typography>
                            <Typography variant="h5" component="h2" >
                            {formatSeconds(stats.total_time_seconds,['H','m','s'])}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            Total participants
                            </Typography>
                            <Typography variant="h5" component="h2" >
                            {stats.total_participants}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            Temps moyen par conversation
                            </Typography>
                            <Typography variant="h5" component="h2" >
                            {formatSeconds(stats.average_time_session,['H','m','s'])}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            }
            {
                sessions &&
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <MaterialTable
                        columns={columns}
                        data={sessions}
                        title={"Sessions"}
                        />
                    </Grid>
                </Grid>
            }
        </>
    );
}

export default Statistics;