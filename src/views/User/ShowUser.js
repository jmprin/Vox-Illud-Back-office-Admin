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
import {TextField, Select, MenuItem, FormControl, InputLabel} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const ShowUser = (props) => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [licensesItems, setLicensesItems] = useState([]);
    const [licenseSelected, setLicenseSelected] = useState('');
    const alertRef = useRef(null);
    const {id} = useParams();
    
    const onUserSubmit = async (values,form) => {

        setLoading(true);
        UserService.updateUser(values)
        .then(res=>{
            alertRef.current.toggle('success', "Utilisateur modifié");
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

    const onLicenseSubmit = async (values,form) => {
        setLoading(true);
        console.log(values);
        UserService.addLicense({license:values.licenseSelected,user:user._id})
        .then(res => {
            alertRef.current.toggle('success', "Utilisateur modifié");
            setUser(res.data);
            setLicenseSelected('');
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
            setLicensesItems(values[1].data);
            setLoading(false);
        })
        .catch((reason) =>{
            alertRef.current.toggle('error', reason);
            setLoading(false);
        })
        
    },[]);

    const formatSeconds= (s) => {
        let tempTime = moment.duration(s,'seconds');
        if (tempTime.hours() <= 0) {
            return tempTime.minutes() + 'min';
        } else {
            return tempTime.hours() + (tempTime.minutes() > 0 ? ':' + tempTime.minutes() : 'h00');
        }
    }

    const columns = [
        { field: 'created_at', title: "Date de création", minWidth:120, render:(props)=> moment(props.created_at).format('DD/MM/Y')  },
        { field: 'license.title', title: 'Nom', minWidth: 120 },
        { field: 'license.quota', title: 'Quota', minWidth: 120, render: (props) => formatSeconds(props.license.quota)},
        { field: 'solde', title: "solde", minWidth:120,render: (props) => formatSeconds(props.solde) },
    ];

    const renderLicensesItems = () =>{

        return (
            <FormControl fullWidth>
                <InputLabel id="select-license">
                    Sélectionnez une license
                </InputLabel>
                <Select required fullWidth id="select-license" labelId="select-license"  value={licenseSelected} onChange={handleChange}>
                    {
                        licensesItems.map((item)=>
                            <MenuItem value={item._id}>{item.title} - {formatSeconds(item.quota)}</MenuItem>
                        )
                    }  
                </Select>
            </FormControl>
        )
           
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setLicenseSelected(event.target.value);
      };

    return (
        <div>
            <Alert ref={alertRef}/>
            <BackdropLoader open={loading}/>
            {
            user && 
                <div>
                   <Form
                    onSubmit={onUserSubmit}
                    initialValues={user}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
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
                            <Button disabled={submitting ? "disabled" : ""} fullWidth type="submit" className="shadow-2 mb-4">Modifier l'utilisateur</Button>
                            <Divider variant="middle"/>
                        </form>
                    )}>
                   </Form>

                    <Form
                        onSubmit={onLicenseSubmit}
                        initialValues={{licenseSelected}}
                        render={({ handleSubmit, form, submitting, pristine, values }) =>(
                            <form onSubmit={handleSubmit}>
                                <Box p={1}>
                                <Field name="license" label={"License"}>
                                    {props => 
                                    renderLicensesItems()
                                    }
                                </Field>
                            </Box>
                            <Button disabled={submitting ? "disabled" : ""} fullWidth type="submit" className="shadow-2 mb-4">Ajouter la licence</Button>
                            <Divider variant="middle"/>
                            </form>
                        )}>
                        
                    </Form>

                   <div>
                       <MaterialTable
                        columns={columns}
                        data={user.licenses}
                        title={"Licences"}
                        />
                   </div>
                </div>
            }
            
        </div>
    );
}

export default ShowUser;