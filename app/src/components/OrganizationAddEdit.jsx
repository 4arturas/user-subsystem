import {Button, CircularProgress, Dialog, TextField} from "@material-ui/core";
import React from "react";
import {Edit} from "@material-ui/icons";
import API from "../API";
import {Alert} from "@material-ui/lab";

export default function OrganizationAddEdit( { id, name } )
{
    const refButton                                 = React.useRef();
    const refCancel                                 = React.useRef();
    const refClose                                  = React.useRef();
    const refInfo                                   = React.useRef();
    const refSuccess                                = React.useRef();
    const refError                                  = React.useRef();
    const [open, setOpen]                           = React.useState(false);
    const [ organizationName, setOrganizationName ]             = React.useState('');
    const [errorOrganizationName, setErrorOrganizationName]     = React.useState('');
    const validateOrganizationName = ( value ) =>
    {
        if ( value.length === 0 )
        {
            setErrorOrganizationName( 'More than 0 symbols' );
            return false;
        }
        else if ( value.length > 20 )
        {
            setErrorOrganizationName( 'Less or equal 20 to symbols' );
            return false;
        }
        else
        {
            setErrorOrganizationName( '' );
            return true
        }
    }
    return <span>
        { id ?
            <Edit style={{cursor:'pointer'}} onClick={ ()=>{ setOpen( true ); } } /> :
            <Button variant="contained" color="primary" onClick={()=>{ setOpen( true ); }}>Add New Organization</Button>
        }
        <Dialog onClose={()=>setOpen(false)} aria-labelledby="simple-dialog-title" open={open} maxWidth="xl"
                disableBackdropClick
                disableEscapeKeyDown>
            <div style={{padding: '20px'}}>
                <div style={{borderBottom: '1px solid gray', fontWeight: 'bold', fontStyle: 'italic', fontSize: 'large'}}>
                    { id ? 'Edit organization' : 'Add new organization' }
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <TextField label='Organization Name'
                                           helperText={ errorOrganizationName }
                                           error={ errorOrganizationName.length > 0 }
                                           onChange={ (event) => {
                                               const value = event.target.value;
                                               setOrganizationName( value );
                                               validateOrganizationName( value );
                                           } }
                                           required
                                           autoComplete="off"
                                           defaultValue={ name ? name : '' }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>

                                <Button ref={refButton} variant="contained" color="primary" onClick={ async () => {
                                    const valid = validateOrganizationName( organizationName );
                                    if ( !valid )
                                    {
                                        return;
                                    }
                                    refButton.current.style.display = 'none';
                                    refCancel.current.style.display = 'none';
                                    refClose.current.style.display = 'none';
                                    refInfo.current.style.display = '';
                                    refError.current.style.display = 'none';

                                    let jSonResponse;
                                    if ( id )
                                        jSonResponse = await API.update_Organization( id, organizationName );
                                    else
                                        jSonResponse = await API.add_Organization( organizationName );

                                    if ( jSonResponse.hasOwnProperty('error' ) )
                                    {
                                        refButton.current.style.display = '';
                                        refCancel.current.style.display = '';
                                        refClose.current.style.display = 'none';
                                        refInfo.current.style.display = 'none';
                                        refSuccess.current.style.display = 'none';
                                        refError.current.style.display = '';
                                        refError.current.getElementsByTagName('span')[0].innerHTML = jSonResponse.error;
                                        return;
                                    }

                                    refButton.current.style.display = 'none';
                                    refCancel.current.style.display = 'none';
                                    refClose.current.style.display = '';
                                    refInfo.current.style.display = 'none';
                                    refError.current.style.display = 'none';
                                    refSuccess.current.style.display = '';
                                }}>{ id ? 'Edit Organization' : 'Add Organization' }</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button ref={refCancel} variant="contained" color="primary" onClick={ () => { setOpen(false ); } }>Cancel</Button>

                                <Alert ref={refSuccess} style={{display:'none'}} severity="success">Organization was successfully {id?'updated':'added'}</Alert>
                                <Alert ref={refError} style={{display:'none'}} severity="error"><span></span></Alert>
                                <Button ref={refClose} style={{display:'none'}} variant="contained" color="primary" onClick={ () => { window.location = id ? `/organizations/organization?id=${id}` : `/organizations` } }>Close</Button>

                                <Alert ref={refInfo} style={{display:'none'}} severity="info"><CircularProgress size={15}/>&nbsp;&nbsp;&nbsp;Wait a second ...</Alert>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Dialog>
    </span>;
}