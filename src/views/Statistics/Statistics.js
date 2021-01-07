import React,{useEffect, useState, useCallback} from 'react';
import Grid from "@material-ui/core/Grid";
import {Trans} from "@lingui/macro";
import {Card, CardContent, Typography} from '@material-ui/core';
import {default as MaterialTable} from "../../components/MaterialTable/MaterialTable";
import StatsService from '../../http-services/stats.service';
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import { formatSeconds } from '../../utils/common';

const Statistics = (props) => {

    const [loading,setLoading] = useState(true);
    const [stats,setStats] = useState([]);
    const [sessions,setSessions] = useState([]);

    const fetchStats = useCallback(async () => {
        let stats = await StatsService.getStats();
        setStats(stats.data);
      }, [])
    
    const fetchSession = useCallback(async () => {
        let stats = await StatsService.getSessions();
        setSessions(stats.data);
    }, [])

    useEffect( () => {

        try {
            fetchStats();
            fetchSession();
            setLoading(false);
        } catch (error) {
            
        }
        
    },[fetchStats,fetchSession]);

    
    const columns = [
        { field: 'conversationId', title: "ID", minWidth: 120 },
        { field: 'host', title: "Hôte", minWidth: 120, render: data => `${data.host.first_name} ${data.host.last_name}` },
        { field: 'participants', title: "Nb participants", minWidth: 120, render: data => data.participants.length === 0 ? 1 : data.participants.length},
        { field: 'created_at', title: "Début", minWidth: 120, render: data => new Date(data.created_at).toLocaleString() },
        { field: 'finished_at', title: "Fin", minWidth: 200, align: 'left', render: data => new Date(data.finished_at).toLocaleString() },
        { field: 'duration', title: "Durée réelle", minWidth: 100, align: 'right',render: data => new Date(data.duration * 1000).toISOString().substr(11, 8) }
    ];

    return (
        <>
            <BackdropLoader open={loading} />
            <h1><Trans>Statistics</Trans></h1>
            {
                stats &&
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