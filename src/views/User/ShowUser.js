import React, {useEffect, useRef, useState} from 'react';
import Alert from "../../components/Alert/Alert";
import { useParams } from 'react-router-dom';
import UserService from '../../http-services/user.service';
import LicenseService from '../../http-services/license.service';
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import {Form, Field} from 'react-final-form';
import {default as MaterialTable} from "../../components/MaterialTable/MaterialTable";
import moment from 'moment';
import Box from "@material-ui/core/Box";
import {TextField, Select, MenuItem, FormControl, InputLabel, Typography, Grid} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { formatSeconds } from '../../utils/common';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    mb_25: {
        marginBottom: '25px',
    },
    mb_50: {
        marginBottom: '50px',
    },
    btn:{
        margin: '15px 0',
        backgroundColor: '#cfdde4',
        "&:hover":{
            backgroundColor: '#7da0b0'
        }
    },
    btn_clipboard:{
        margin: '10px',
        backgroundColor: '#cfdde4',
        "&:hover":{
            backgroundColor: '#7da0b0'
        }
    },
    w_100:{
        width:'100%'
    }

});

const ShowUser = (props) => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [licensesItems, setLicensesItems] = useState([]);
    const [copySuccess, setCopySuccess] = useState('');
    const tokenInputRef = useRef(null);
    const alertRef = useRef(null);
    const {id} = useParams();
    
    const onUserSubmit = async (values,form) => {
        setLoading(true);
        UserService.updateUser(values)
        .then(res=>{
            alertRef.current.toggle('success', "Utilisateur modifié");
            setLoading(false);
            form.change('password',undefined);
            
        })
        .catch(error => {
            if (error.response) {
                alertRef.current.toggle('error', error.response.data.message);
            }
            alertRef.current.toggle('error', error.toString());
            setLoading(false);
        })
    }

    const onLicenseSubmit = async (values,form) => {
        setLoading(true);
        UserService.addLicense({license:values.license,user:user._id})
        .then(res => {
            alertRef.current.toggle('success', "Utilisateur modifié");
            setUser(res.data);
            form.change('license',undefined);
            setLoading(false);
        })
        .catch(error => {
            if (error.response) {
                alertRef.current.toggle('error', error.response.data.message);
            }
            alertRef.current.toggle('error', error.toString());
            setLoading(false);
        })
       
    }

    useEffect( () =>{
        setLoading(true);
        
        Promise.all([UserService.getUser(id),LicenseService.getLicenses()])
        .then((values) =>{
            setUser(values[0].data);
            // setUser({...values[0].data,language_spoken:'en_EN',language_written:'en_EN',nick_name:'aaaa'});
            setLicensesItems(values[1].data);
            setLoading(false);
        })
        .catch((reason) =>{
            alertRef.current.toggle('error', reason);
            setLoading(false);
        })
        
    },[]);


    const columns = [
        { field: 'created_at', title: "Date de création", minWidth:120, render:(props)=> moment(props.created_at).format('DD/MM/Y')  },
        { field: 'license.title', title: 'Nom', minWidth: 120 },
        { field: 'license.quota', title: 'Quota', minWidth: 120, render: (props) => formatSeconds(props.license.quota,['H','m'])},
        { field: 'solde', title: "solde", minWidth:120,render: (props) => formatSeconds(props.solde,['H','m']) },
    ];

    const renderLicensesItems = ({input}) =>{

        return (
            <FormControl fullWidth>
                <InputLabel id="select-license">
                    Sélectionner une license
                </InputLabel>
                <Select required fullWidth id="select-license" labelId="select-license" name={input.name}  value={input.value} onChange={input.onChange}>
                    {
                        licensesItems.map((item)=>
                            <MenuItem value={item._id}>{item.title} - {formatSeconds(item.quota,['H','m'])}</MenuItem>
                        )
                    }  
                </Select>
            </FormControl>
        )
           
    }

    const renderLanguageItems = (title,props) =>{
        return (
            <FormControl fullWidth>
                <InputLabel id={"select-language_"+ props.name}>
                    {title}
                </InputLabel>
                <Select fullWidth id={"select-language_"+props.name} labelId={"select-language_"+props.name} name={props.input.name}  value={props.input.value} onChange={props.input.onChange}>
                    <MenuItem value="fr_FR">Français</MenuItem>
                    <MenuItem value="en_EN">Anglais</MenuItem>
                </Select>
            </FormControl>
        )
           
    }

    function copyToClipboard(e) {
        e.preventDefault();
        tokenInputRef.current.select();
        document.execCommand('copy');
        setCopySuccess('Copié');
        setTimeout(() => {
            setCopySuccess('');
        }, 3000);
    };

    const classes = useStyles();
    return (
        <div>
           
            <Alert ref={alertRef}/>
            <BackdropLoader open={loading}/>
            {
            user && 
                <div>
                    <Typography variant="h5" gutterBottom>
                        Informations de l'utilisateur
                    </Typography>
                    <Divider light /> 
                   <Form
                    onSubmit={onUserSubmit}
                    initialValues={user}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className={classes.mb_50}>
                            <Box p={1}>
                                <Field name="last_name" placeholder={"Nom"} label={"Nom"}>
                                    {props => <TextField variant="outlined" fullWidth {...props} {...props.input}/>}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="first_name" placeholder={"Prénom"} label={"Prénom"}>
                                    {props => <TextField variant="outlined" fullWidth {...props} {...props.input}/>}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="email" placeholder={"E-mail"} label={"E-mail"}>
                                    {props => <TextField variant="outlined" fullWidth {...props} {...props.input}/>}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="password" placeholder={"Mot de passe"} label={"Mot de passe"}>
                                    {props => <TextField variant="outlined" fullWidth {...props} {...props.input}/>}
                                </Field>
                            </Box>
                            <h5>
                                Préférences utilisateur
                            </h5>
                            <Divider light />
                            <Box p={1}>
                                <Field name="nick_name" placeholder={"Nom d'affichage"} label={"Nom d'affichage"}>
                                    {props => <TextField variant="outlined" fullWidth {...props} {...props.input}/>}
                                </Field>
                            </Box>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Box p={1}>
                                        <Field name="language_spoken" label={"Language"}>
                                            {props => 
                                                renderLanguageItems("Selectionner une langue parlée", props)
                                            }
                                        </Field>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} className={classes.mb_25}>
                                    <Box p={1}>
                                        <Field name="language_written" label={"Language"}>
                                            {props => 
                                            renderLanguageItems("Selectionner une langue écrite",props)
                                            }
                                        </Field>
                                    </Box>
                                </Grid>
                                { user.auto_start_token &&
                                    <Grid container>
                                         <Grid item xs={8}>
                                     <TextField
                                         className={classes.w_100}
                                         inputRef={tokenInputRef}
                                         id="outlined-read-only-input"
                                         label="Token utilisateur"
                                         defaultValue={user.auto_start_token}
                                         InputProps={{
                                             readOnly: true,
                                         }}
                                         variant="outlined"
                                     />
                                 </Grid>
                                  <Grid item xs={4}>
                                       <div>
                                         <Button className={`shadow-2 mb-4 ${classes.btn_clipboard}`} onClick={copyToClipboard}>Copier le token</Button>
                                         {copySuccess}    
                                     </div>
                                  </Grid>
                                    </Grid>
                                }
                            </Grid>
                           
                            <Button disabled={submitting ? "disabled" : ""} fullWidth type="submit" className={`shadow-2 mb-4 ${classes.btn}`}>Modifier l'utilisateur</Button>
                            {/* <Divider variant="middle"/> */}
                        </form>
                    )}>
                   </Form>
                
                   <Typography variant="h5" gutterBottom>
                        Licences
                    </Typography>
                
                    <Form
                        onSubmit={onLicenseSubmit}
                        render={({ handleSubmit, form, submitting, pristine, values }) =>(
                            <form onSubmit={handleSubmit} className={classes.mb_25}>
                            <Box p={1}>
                                <Field name="license" label={"License"}>
                                    {props => 
                                    renderLicensesItems(props)
                                    }
                                </Field>
                            </Box>
                            <Button disabled={submitting ? "disabled" : ""} fullWidth type="submit" className={`shadow-2 mb-4 ${classes.btn}`}>Ajouter la licence</Button>
                            <Divider variant="middle"/>
                            </form>
                        )}>
                        
                    </Form>

                   <div>
                       <MaterialTable
                        columns={columns}
                        data={user.licenses}
                        title={"Licences utilisateur"}
                        />
                   </div>
                </div>
            }
            
        </div>
    );
}

export default ShowUser;